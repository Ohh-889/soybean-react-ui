/**
 * @ignore
 * some key-codes definition and utils from closure-library
 * @author yiminghe@gmail.com
 */

const KeyCode = {
  // needs localization
  /**
   * A
   */
  A: 65,
  /**
   * ALT
   */
  ALT: 18,
  // needs localization
  /**
   * APOSTROPHE
   */
  APOSTROPHE: 192,
  /**
   * B
   */
  B: 66, // needs localization
  /**
   * BACKSLASH
   */
  BACKSLASH: 220,
  /**
   * BACKSPACE
   */
  BACKSPACE: 8,
  /**
   * C
   */
  C: 67,
  /**
   * CAPS_LOCK
   */
  CAPS_LOCK: 20,
  // needs localization
  /**
   * CLOSE_SQUARE_BRACKET
   */
  CLOSE_SQUARE_BRACKET: 221,
  // needs localization
  /**
   * COMMA
   */
  COMMA: 188,
  /**
   * CONTEXT_MENU
   */
  CONTEXT_MENU: 93,
  /**
   * CTRL
   */
  CTRL: 17,
  /**
   * D
   */
  D: 68, // needs localization
  /**
   * DASH
   */
  DASH: 189, // also NUM_INSERT
  /**
   * DELETE
   */
  DELETE: 46, // also NUM_EAST
  /**
   * DOWN
   */
  DOWN: 40 /**
   * E
   */,
  E: 69 /**
   * EIGHT
   */,
  EIGHT: 56, // also NUM_SOUTH_EAST
  /**
   * END
   */
  END: 35, // NUMLOCK on FF/Safari Mac
  /**
   * ENTER
   */
  ENTER: 13, // needs localization
  /**
   * EQUALS
   */
  EQUALS: 187,
  /**
   * ESC
   */
  ESC: 27 /**
   * F
   */,
  F: 70 /**
   * F1
   */,
  F1: 112,
  /**
   * F2
   */
  F2: 113,
  /**
   * F3
   */
  F3: 114,
  /**
   * F4
   */
  F4: 115,
  /**
   * F5
   */
  F5: 116,
  /**
   * F6
   */
  F6: 117,
  /**
   * F7
   */
  F7: 118,
  /**
   * F8
   */
  F8: 119,
  /**
   * F9
   */
  F9: 120,
  /**
   * F10
   */
  F10: 121,
  /**
   * F11
   */
  F11: 122 /**
   * F12
   */,
  F12: 123,
  /**
   * FIVE
   */
  FIVE: 53,
  /**
   * FOUR
   */
  FOUR: 52,
  /**
   * G
   */
  G: 71,
  /**
   * H
   */
  H: 72,
  // also NUM_SOUTH_WEST
  /**
   * HOME
   */
  HOME: 36,
  /**
   * I
   */
  I: 73,
  /**
   * INSERT
   */
  INSERT: 45,
  /**
   * whether character is entered.
   */
  // eslint-disable-next-line complexity
  isCharacterKey: function isCharacterKey(keyCode: number) {
    if (keyCode >= KeyCode.ZERO && keyCode <= KeyCode.NINE) {
      return true;
    }

    if (keyCode >= KeyCode.NUM_ZERO && keyCode <= KeyCode.NUM_MULTIPLY) {
      return true;
    }

    if (keyCode >= KeyCode.A && keyCode <= KeyCode.Z) {
      return true;
    }

    // Safari sends zero key code for non-latin characters.
    if (window.navigator.userAgent.includes('WebKit') && keyCode === 0) {
      return true;
    }

    switch (keyCode) {
      case KeyCode.SPACE:
      case KeyCode.QUESTION_MARK:
      case KeyCode.NUM_PLUS:
      case KeyCode.NUM_MINUS:
      case KeyCode.NUM_PERIOD:
      case KeyCode.NUM_DIVISION:
      case KeyCode.SEMICOLON:
      case KeyCode.DASH:
      case KeyCode.EQUALS:
      case KeyCode.COMMA:
      case KeyCode.PERIOD:
      case KeyCode.SLASH:
      case KeyCode.APOSTROPHE:
      case KeyCode.SINGLE_QUOTE:
      case KeyCode.OPEN_SQUARE_BRACKET:
      case KeyCode.BACKSLASH:
      case KeyCode.CLOSE_SQUARE_BRACKET:
        return true;
      default:
        return false;
    }
  },
  // ======================== Function ========================
  /**
   * whether text and modified key is entered at the same time.
   */
  // eslint-disable-next-line complexity
  isTextModifyingKeyEvent: function isTextModifyingKeyEvent(e: KeyboardEvent) {
    const { keyCode } = e;
    if (
      (e.altKey && !e.ctrlKey) ||
      e.metaKey ||
      // Function keys don't generate text
      (keyCode >= KeyCode.F1 && keyCode <= KeyCode.F12)
    ) {
      return false;
    }

    // The following keys are quite harmless, even in combination with
    // CTRL, ALT or SHIFT.
    switch (keyCode) {
      case KeyCode.ALT:
      case KeyCode.CAPS_LOCK:
      case KeyCode.CONTEXT_MENU:
      case KeyCode.CTRL:
      case KeyCode.DOWN:
      case KeyCode.END:
      case KeyCode.ESC:
      case KeyCode.HOME:
      case KeyCode.INSERT:
      case KeyCode.LEFT:
      case KeyCode.MAC_FF_META:
      case KeyCode.META:
      case KeyCode.NUMLOCK:
      case KeyCode.NUM_CENTER:
      case KeyCode.PAGE_DOWN:
      case KeyCode.PAGE_UP:
      case KeyCode.PAUSE:
      case KeyCode.PRINT_SCREEN:
      case KeyCode.RIGHT:
      case KeyCode.SHIFT:
      case KeyCode.UP:
      case KeyCode.WIN_KEY:
      case KeyCode.WIN_KEY_RIGHT:
        return false;
      default:
        return true;
    }
  },
  /**
   * J
   */
  J: 74,
  /**
   * K
   */
  K: 75,
  /**
   * L
   */
  L: 76,
  // also NUM_NORTH_WEST
  /**
   * LEFT
   */
  LEFT: 37,
  /**
   * M
   */
  M: 77,
  /**
   * MAC_ENTER
   */
  MAC_ENTER: 3,
  /**
   * MAC_FF_META
   */
  MAC_FF_META: 224,
  /**
   * META
   */
  META: 91,
  /**
   * N
   */
  N: 78,
  /**
   * NINE
   */
  NINE: 57,
  /**
   * NUMLOCK on FF/Safari Mac
   */
  NUM_CENTER: 12,
  /**
   * NUM_DIVISION
   */
  NUM_DIVISION: 111,
  /**
   * NUM_EIGHT
   */
  NUM_EIGHT: 104,
  /**
   * NUM_FIVE
   */
  NUM_FIVE: 101,
  /**
   * NUM_FOUR
   */
  NUM_FOUR: 100,
  /**
   * NUM_MINUS
   */
  NUM_MINUS: 109,
  /**
   * NUM_MULTIPLY
   */
  NUM_MULTIPLY: 106 /**
   * NUM_NINE
   */,
  NUM_NINE: 105,
  /**
   * NUM_ONE
   */
  NUM_ONE: 97,
  /**
   * NUM_PERIOD
   */
  NUM_PERIOD: 110,
  /**
   * NUM_PLUS
   */
  NUM_PLUS: 107,
  /**
   * NUM_SEVEN
   */
  NUM_SEVEN: 103,
  /**
   * NUM_SIX
   */
  NUM_SIX: 102,
  /**
   * NUM_THREE
   */
  NUM_THREE: 99,
  /**
   * NUM_TWO
   */
  NUM_TWO: 98,
  /**
   * NUM_ZERO
   */
  NUM_ZERO: 96,
  /**
   * NUMLOCK
   */
  NUMLOCK: 144,
  /**
   * O
   */
  O: 79,
  /**
   * ONE
   */
  ONE: 49,
  // needs localization
  /**
   * OPEN_SQUARE_BRACKET
   */
  OPEN_SQUARE_BRACKET: 219,
  /**
   * P
   */
  P: 80,
  // also NUM_NORTH_EAST
  /**
   * PAGE_DOWN
   */
  PAGE_DOWN: 34,
  /**
   * PAGE_UP
   */
  PAGE_UP: 33,
  /**
   * PAUSE
   */
  PAUSE: 19,
  // needs localization
  /**
   * PERIOD
   */
  PERIOD: 190,
  // also NUM_SOUTH
  /**
   * PRINT_SCREEN
   */
  PRINT_SCREEN: 44,
  /**
   * Q
   */
  Q: 81,
  /**
   * QUESTION_MARK
   */
  QUESTION_MARK: 63,
  /**
   * R
   */
  R: 82,
  // also NUM_NORTH
  /**
   * RIGHT
   */
  RIGHT: 39,
  /**
   * S
   */
  S: 83,
  /**
   * SEMICOLON
   */
  SEMICOLON: 186,
  /**
   * SEVEN
   */
  SEVEN: 55,
  /**
   * SHIFT
   */
  SHIFT: 16,
  // needs localization
  /**
   * SINGLE_QUOTE
   */
  SINGLE_QUOTE: 222,
  /**
   * SIX
   */
  SIX: 54,
  // needs localization
  /**
   * SLASH
   */
  SLASH: 191,
  /**
   * SPACE
   */
  SPACE: 32 /**
   * T
   */,
  T: 84 /**
   * TAB
   */,
  TAB: 9 /**
   * THREE
   */,
  THREE: 51 /**
   * TWO
   */,
  TWO: 50 /**
   * U
   */,
  U: 85, // also NUM_WEST
  /**
   * UP
   */
  UP: 38 /**
   * V
   */,
  V: 86 /**
   * W
   */,
  W: 87, // Firefox (Gecko) fires this for the meta key instead of 91
  /**
   * WIN_IME
   */
  WIN_IME: 229, // needs localization
  /**
   * WIN_KEY
   */
  WIN_KEY: 224, // WIN_KEY_LEFT
  /**
   * WIN_KEY_RIGHT
   */
  WIN_KEY_RIGHT: 92,
  /**
   * X
   */
  X: 88 /**
   * Y
   */,
  Y: 89,

  /**
   * Z
   */
  Z: 90,

  // also NUM_DELETE
  /**
   * ZERO
   */
  ZERO: 48
};

export default KeyCode;
