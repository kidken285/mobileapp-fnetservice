import React, {forwardRef} from 'react';
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import MyText from '../text';
import {
  useController,
  useFormContext,
  ControllerProps,
  UseControllerProps,
} from 'react-hook-form';

interface MyInputProps extends RNTextInputProps, UseControllerProps {
  label: string;
  name: string;
  defaultValue?: string;
  iconRight?: React.ReactNode;
  onPressIconRight?: () => void;
  setFormError: Function;
}

const ControlledInput = forwardRef<RNTextInput, MyInputProps>((props, ref) => {
  const {colors} = useTheme();
  const formContext = useFormContext();
  const {formState} = formContext;

  const {
    name,
    label,
    rules,
    defaultValue,
    style,
    iconRight,
    onPressIconRight,
    ...inputProps
  } = props;

  const {field} = useController({name, rules, defaultValue});
  const hasError = Boolean(formState?.errors[name]);

  return (
    <View style={styles.container}>
      {label && (
        <MyText variant="bold" style={styles.label}>
          {label}
          {rules !== null && rules !== undefined && (
            <MyText style={styles.errorText}> *</MyText>
          )}
        </MyText>
      )}
      <View style={{position: 'relative'}}>
        <RNTextInput
          autoCapitalize="none"
          ref={ref}
          style={[
            styles.input,
            {
              // backgroundColor: colors.card,
              backgroundColor: 'rgba(0,0,0,.02)',
              color: colors.text,
            },
            hasError && styles.inputError,
            style,
          ]}
          // placeholderTextColor={colors.text + '80'}
          onChangeText={field.onChange}
          onBlur={field.onBlur}
          value={field.value}
          {...inputProps}
        />
        {iconRight && (
          <View
            style={{
              position: 'absolute',
              right: 12,
              top: 0,
              bottom: 0,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableWithoutFeedback onPress={onPressIconRight}>
              {iconRight}
            </TouchableWithoutFeedback>
          </View>
        )}
      </View>
      {hasError && (
        <MyText style={styles.errorText}>
          {String(formState.errors[name]?.message)}
        </MyText>
      )}
    </View>
  );
});

export const MyInput = forwardRef<RNTextInput, MyInputProps>((props, ref) => {
  const {name, rules, label, defaultValue, setFormError, ...inputProps} = props;

  const formContext = useFormContext();

  // Placeholder until input name is initialized
  if (!formContext || !name) {
    const msg = !formContext
      ? 'TextInput must be wrapped by the FormProvider'
      : 'Name must be defined';
    console.error(msg);
    setFormError(true);
    return null;
  }

  return <ControlledInput ref={ref} {...props} />;
});

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 6,
  },
  input: {
    height: 54,
    paddingHorizontal: 12,
    borderRadius: 8,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  inputError: {
    borderColor: '#FF3B30',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 14,
    marginTop: 4,
  },
});
