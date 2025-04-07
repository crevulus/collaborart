export const nameField = {
  name: "name",
  placeholder: "Name",
};

export const pinField = {
  name: "pin",
  placeholder: "PIN",
  type: "text",
  inputMode: "numeric" as const,
  pattern: "[0-9]*",
  maxLength: 6,
};
