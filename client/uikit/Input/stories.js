import { storiesOf } from "@storybook/react";
import React from "react";
import Input from ".";
import { text, boolean, radios } from "@storybook/addon-knobs";

const createKnobs = () => {
  const error = boolean("error", false);
  const disabled = boolean("disabled", false);
  const placeholder = text("Placeholder", "State typing here..");
  const size = radios(
    "size",
    {
      sm: "sm",
      lg: "lg"
    },
    "sm"
  );

  return {
    error,
    disabled,
    placeholder,
    size
  };
};

const InputStories = storiesOf(`${__dirname}`, module).add("Basic", () => {
  const props = createKnobs();
  return <Input {...props} />;
});

export default InputStories;