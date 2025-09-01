type ValidateMessage = string;

export interface ValidateMessages {
  array?: {
    len?: ValidateMessage;
    max?: ValidateMessage;
    min?: ValidateMessage;
    range?: ValidateMessage;
  };
  date?: {
    format?: ValidateMessage;
    invalid?: ValidateMessage;
    parse?: ValidateMessage;
  };
  default?: ValidateMessage;
  enum?: ValidateMessage;
  number?: {
    len?: ValidateMessage;
    max?: ValidateMessage;
    min?: ValidateMessage;
    range?: ValidateMessage;
  };
  pattern?: {
    mismatch?: ValidateMessage;
  };
  required?: ValidateMessage;
  string?: {
    len?: ValidateMessage;
    max?: ValidateMessage;
    min?: ValidateMessage;
    range?: ValidateMessage;
  };
  types?: {
    array?: ValidateMessage;
    boolean?: ValidateMessage;
    date?: ValidateMessage;
    email?: ValidateMessage;
    float?: ValidateMessage;
    hex?: ValidateMessage;
    integer?: ValidateMessage;
    method?: ValidateMessage;
    number?: ValidateMessage;
    object?: ValidateMessage;
    regexp?: ValidateMessage;
    string?: ValidateMessage;
    url?: ValidateMessage;
  };
  whitespace?: ValidateMessage;
}
