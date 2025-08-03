// 'use client';

// import { CircleCheckIcon, CircleHelpIcon, CircleIcon } from 'lucide-react';
// import Link from 'next/link';
// import * as React from 'react';
// import {
//   NavigationMenuContent,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
//   NavigationMenuRoot,
//   NavigationMenuTrigger
// } from 'soybean-react-ui';

// const components: { description: string; href: string; title: string }[] = [
//   {
//     description: 'A modal dialog that interrupts the user with important content and expects a response.',
//     href: '/docs/primitives/alert-dialog',
//     title: 'Alert Dialog'
//   },
//   {
//     description: 'For sighted users to preview content available behind a link.',
//     href: '/docs/primitives/hover-card',
//     title: 'Hover Card'
//   },
//   {
//     description:
//       'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.',
//     href: '/docs/primitives/progress',
//     title: 'Progress'
//   },
//   {
//     description: 'Visually or semantically separates content.',
//     href: '/docs/primitives/scroll-area',
//     title: 'Scroll-area'
//   },
//   {
//     description: 'A set of layered sections of content—known as tab panels—that are displayed one at a time.',
//     href: '/docs/primitives/tabs',
//     title: 'Tabs'
//   },
//   {
//     description:
//       'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',
//     href: '/docs/primitives/tooltip',
//     title: 'Tooltip'
//   }
// ];

// export default function NavigationMenuDemo() {
//   return (
//     <NavigationMenuRoot>
//       <NavigationMenuList>
//         <NavigationMenuItem>
//           <NavigationMenuTrigger>Home</NavigationMenuTrigger>
//           <NavigationMenuContent>
//             <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
//               <li className="row-span-3">
//                 <NavigationMenuLink>
//                   <div className="mt-4 mb-2 text-lg font-medium">shadcn/ui</div>
//                   <p className="text-muted-foreground text-sm leading-tight">
//                     Beautifully designed components built with Tailwind CSS.
//                   </p>
//                 </NavigationMenuLink>
//               </li>
//               <ListItem
//                 href="/docs"
//                 title="Introduction"
//               >
//                 Re-usable components built using Radix UI and Tailwind CSS.
//               </ListItem>
//               <ListItem
//                 href="/docs/installation"
//                 title="Installation"
//               >
//                 How to install dependencies and structure your app.
//               </ListItem>
//               <ListItem
//                 href="/docs/primitives/typography"
//                 title="Typography"
//               >
//                 Styles for headings, paragraphs, lists...etc
//               </ListItem>
//             </ul>
//           </NavigationMenuContent>
//         </NavigationMenuItem>

//         <NavigationMenuItem>
//           <NavigationMenuTrigger>Components</NavigationMenuTrigger>
//           <NavigationMenuContent>
//             <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
//               {components.map(component => (
//                 <ListItem
//                   href={component.href}
//                   key={component.title}
//                   title={component.title}
//                 >
//                   {component.description}
//                 </ListItem>
//               ))}
//             </ul>
//           </NavigationMenuContent>
//         </NavigationMenuItem>
//         <NavigationMenuItem>
//           <NavigationMenuLink>Docs</NavigationMenuLink>
//         </NavigationMenuItem>
//         <NavigationMenuItem>
//           <NavigationMenuTrigger>List</NavigationMenuTrigger>
//           <NavigationMenuContent>
//             <ul className="grid w-[300px] gap-4">
//               <li>
//                 <NavigationMenuLink>
//                   <div className="font-medium">Components</div>
//                   <div className="text-muted-foreground">Browse all components in the library.</div>
//                 </NavigationMenuLink>
//                 <NavigationMenuLink>
//                   <div className="font-medium">Documentation</div>
//                   <div className="text-muted-foreground">Learn how to use the library.</div>
//                 </NavigationMenuLink>
//                 <NavigationMenuLink>
//                   <div className="font-medium">Blog</div>
//                   <div className="text-muted-foreground">Read our latest blog posts.</div>
//                 </NavigationMenuLink>
//               </li>
//             </ul>
//           </NavigationMenuContent>
//         </NavigationMenuItem>
//         <NavigationMenuItem>
//           <NavigationMenuTrigger>Simple</NavigationMenuTrigger>
//           <NavigationMenuContent>
//             <ul className="grid w-[200px] gap-4">
//               <li>
//                 <NavigationMenuLink>Components</NavigationMenuLink>
//                 <NavigationMenuLink>Documentation</NavigationMenuLink>
//                 <NavigationMenuLink>Blocks</NavigationMenuLink>
//               </li>
//             </ul>
//           </NavigationMenuContent>
//         </NavigationMenuItem>
//       </NavigationMenuList>
//     </NavigationMenuRoot>
//   );
// }

// function ListItem({ children, href, title, ...props }: React.ComponentPropsWithoutRef<'li'> & { href: string }) {
//   return (
//     <li {...props}>
//       <NavigationMenuLink>
//         <div className="text-sm leading-none font-medium">{title}</div>
//         <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">{children}</p>
//       </NavigationMenuLink>
//     </li>
//   );
// }
