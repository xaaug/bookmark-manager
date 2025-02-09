import { Flex, Input, Label, Text } from "@aws-amplify/ui-react";

type Props = {
  handleInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isRequired?: boolean;
  label: string;
  id: string;
  value: string | undefined;
  type?: string;
  hasError?: boolean;
};

const InputField: React.FC<Props> = ({
  handleInput,
  isRequired,
  id,
  label,
  type,
  hasError,
  value,
}) => {
  return (
    <Flex direction="column" gap="small">
      <Label htmlFor={id}>
        {label}{" "}
        {isRequired ? (
          <Text as="span" fontSize="small" color="font.error">
            {" "}
            (required){" "}
          </Text>
        ) : (
          ""
        )}
      </Label>
      <Input
        id={id}
        type={type ? "text" : type}
        onChange={(e) => handleInput(e)}
        isRequired={isRequired}
        hasError={hasError}
        value={value}
      />
    </Flex>
  );
};

export default InputField;
