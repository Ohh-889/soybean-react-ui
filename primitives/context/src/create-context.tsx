import * as React from 'react';

/**
 * 创建 React 上下文的辅助函数
 * Helper function to create a React context with Provider and useContext hook
 *
 * @param rootComponentName 根组件名称，用于错误信息和 displayName / Root component name for error messages and displayName
 * @param defaultContext 默认上下文值 / Default context value
 * @returns [Provider, useContext] 返回提供者组件和 useContext 钩子 / Returns Provider component and useContext hook
 */
function createContext<ContextValueType extends object | null>(
  rootComponentName: string,
  defaultContext?: ContextValueType
) {
  const Context = React.createContext<ContextValueType | undefined>(defaultContext);

  const Provider: React.FC<ContextValueType & { children: React.ReactNode }> = props => {
    const { children, ...context } = props;
    // Only re-memoize when prop values change
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const value = React.useMemo(() => context, Object.values(context)) as ContextValueType;
    return <Context.Provider value={value}>{children}</Context.Provider>;
  };

  Provider.displayName = `${rootComponentName}Provider`;

  function useContext(consumerName: string) {
    const context = React.useContext(Context);
    if (context) return context;
    if (defaultContext !== undefined) return defaultContext;
    // if a defaultContext wasn't specified, it's a required context.
    throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
  }

  return [Provider, useContext] as const;
}

/* -------------------------------------------------------------------------------------------------
 * createContextScope
 * ----------------------------------------------------------------------------------------------- */

type Scope<C = any> = { [scopeName: string]: React.Context<C>[] } | undefined;
type ScopeHook = (scope: Scope) => { [__scopeProp: string]: Scope };
interface CreateScope {
  (): ScopeHook;
  scopeName: string;
}

/**
 * 创建作用域化的上下文系统
 * Creates a scoped context system that allows multiple instances of the same component tree
 *
 * @param scopeName 作用域名称 / Scope name
 * @param createContextScopeDeps 依赖的作用域创建器数组 / Array of dependent scope creators
 * @returns [createScopeContext, createScope] 返回作用域上下文创建器和作用域创建器 / Returns scoped context creator and scope creator
 */
function createContextScope(scopeName: string, createContextScopeDeps: CreateScope[] = []) {
  let defaultContexts: any[] = [];

  /* -----------------------------------------------------------------------------------------------
   * createContext
   * --------------------------------------------------------------------------------------------- */

  /**
   * 创建支持作用域的上下文
   * Creates a context that supports scoping for isolated component instances
   *
   * @param rootComponentName 根组件名称 / Root component name
   * @param defaultContext 默认上下文值 / Default context value
   * @returns [Provider, useContext] 返回作用域化的提供者和钩子 / Returns scoped Provider and useContext hook
   */
  function createScopeContext<ContextValueType extends object | null>(
    rootComponentName: string,
    defaultContext?: ContextValueType
  ) {
    const BaseContext = React.createContext<ContextValueType | undefined>(defaultContext);
    const index = defaultContexts.length;
    defaultContexts = [...defaultContexts, defaultContext];

    const Provider: React.FC<
      ContextValueType & { children: React.ReactNode; scope: Scope<ContextValueType> }
    > = props => {
      const { children, scope, ...context } = props;
      const Context = scope?.[scopeName]?.[index] || BaseContext;
      // Only re-memoize when prop values change
      // eslint-disable-next-line react-hooks/exhaustive-deps
      const value = React.useMemo(() => context, Object.values(context)) as ContextValueType;
      return <Context.Provider value={value}>{children}</Context.Provider>;
    };

    Provider.displayName = `${rootComponentName}Provider`;

    function useContext(consumerName: string, scope: Scope<ContextValueType | undefined>) {
      const Context = scope?.[scopeName]?.[index] || BaseContext;
      const context = React.useContext(Context);
      if (context) return context;
      if (defaultContext !== undefined) return defaultContext;
      // if a defaultContext wasn't specified, it's a required context.
      throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
    }

    return [Provider, useContext] as const;
  }

  /* -----------------------------------------------------------------------------------------------
   * createScope
   * --------------------------------------------------------------------------------------------- */

  /**
   * 创建作用域钩子
   * Creates a scope hook that manages isolated context instances
   *
   * @returns useScope 返回作用域钩子函数 / Returns the useScope hook function
   */
  const createScope: CreateScope = () => {
    const scopeContexts = defaultContexts.map(defaultContext => {
      return React.createContext(defaultContext);
    });
    return function useScope(scope: Scope) {
      const contexts = scope?.[scopeName] || scopeContexts;
      return React.useMemo(() => ({ [`__scope${scopeName}`]: { ...scope, [scopeName]: contexts } }), [scope, contexts]);
    };
  };

  createScope.scopeName = scopeName;
  return [createScopeContext, composeContextScopes(createScope, ...createContextScopeDeps)] as const;
}

/* -------------------------------------------------------------------------------------------------
 * composeContextScopes
 * ----------------------------------------------------------------------------------------------- */

/**
 * 组合多个上下文作用域
 * Composes multiple context scopes into a single scope system
 *
 * @param scopes 要组合的作用域创建器数组 / Array of scope creators to compose
 * @returns CreateScope 返回组合后的作用域创建器 / Returns the composed scope creator
 */
function composeContextScopes(...scopes: [CreateScope, ...CreateScope[]]): CreateScope {
  const baseScope = scopes[0];
  if (scopes.length === 1) return baseScope;

  const createScope: CreateScope = () => {
    const scopeHooks = scopes.map(scope => ({
      scopeName: scope.scopeName,
      useScope: scope()
    }));

    return function useComposedScopes(overrideScopes) {
      const nextNewScopes = scopeHooks.reduce((nextScopes, { scopeName, useScope }) => {
        // We are calling a hook inside a callback which React warns against to avoid inconsistent
        // renders, however, scoping doesn't have render side effects so we ignore the rule.
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const scopeProps = useScope(overrideScopes);
        const currentScope = scopeProps[`__scope${scopeName}`];
        return { ...nextScopes, ...currentScope };
      }, {});

      return React.useMemo(() => ({ [`__scope${baseScope.scopeName}`]: nextNewScopes }), [nextNewScopes]);
    };
  };

  createScope.scopeName = baseScope.scopeName;
  return createScope;
}

/* ----------------------------------------------------------------------------------------------- */

export { createContext, createContextScope };
export type { CreateScope, Scope };
