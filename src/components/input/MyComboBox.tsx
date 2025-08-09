import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  Keyboard,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import MyText from '../text';
import {
  ControllerProps,
  UseControllerProps,
  useController,
  useFormContext,
} from 'react-hook-form';
import MyIcon from '../icon/MyIcon';

export type ComboBoxItem = {
  label: string;
  value: string;
};

interface MyComboBoxProps
  extends Omit<RNTextInputProps, 'value' | 'onChange' | 'onChangeText'>,
    UseControllerProps {
  name: string;
  label: string;
  items: ComboBoxItem[];
  defaultValue?: string;
  placeholder?: string;
  setFormError: (err: boolean) => void;
  onSelected?: (item: ComboBoxItem | null) => void;
  emptyText?: string;
}

export const MyComboBox: React.FC<MyComboBoxProps> = props => {
  const {
    name,
    label,
    rules,
    defaultValue,
    items,
    placeholder,
    style,
    setFormError,
    onSelected,
    emptyText = 'Không có dữ liệu',
    editable = true,
    ...inputProps
  } = props;

  const {colors} = useTheme();
  const formContext = useFormContext();
  const {field} = useController({name, rules, defaultValue});
  const {formState} = formContext ?? {formState: undefined as any};
  const hasError = Boolean(formState?.errors?.[name]);

  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState('');

  const inputRef = useRef<RNTextInput>(null);

  const getLabelForValue = (value?: string) => {
    if (!value) return '';
    const found = items.find(i => i.value === value);
    return found?.label ?? '';
  };

  useEffect(() => {
    // Keep search text in sync when field value or items change
    if (!isOpen) {
      setSearchText(getLabelForValue(field.value));
    }
  }, [field.value, items, isOpen]);

  const filteredItems = useMemo(() => {
    const keyword = searchText?.trim().toLowerCase();
    if (!keyword) return items;
    return items.filter(i => i.label.toLowerCase().includes(keyword));
  }, [items, searchText]);

  const handleToggle = () => {
    if (!editable) return;
    setIsOpen(prev => !prev);
  };

  const handleFocus = () => {
    if (!editable) return;
    setSearchText(getLabelForValue(field.value));
    setIsOpen(true);
  };

  const handleSelect = (item: ComboBoxItem) => {
    field.onChange(item.value);
    setIsOpen(false);
    setSearchText(item.label);
    onSelected?.(item);
    Keyboard.dismiss();
  };

  const handleClear = () => {
    field.onChange('');
    setSearchText('');
    onSelected?.(null);
  };

  // Guard: ensure within FormProvider
  if (!formContext || !name) {
    const msg = !formContext
      ? 'MyComboBox must be wrapped by the FormProvider'
      : 'Name must be defined';
    console.error(msg);
    setFormError(true);
    return null;
  }

  return (
    <View style={styles.container}>
      {!!label && (
        <MyText variant="bold" style={styles.label}>
          {label}
          {rules !== null && rules !== undefined && (
            <MyText style={styles.errorText}> *</MyText>
          )}
        </MyText>
      )}

      <View style={{position: 'relative'}}>
        <RNTextInput
          ref={inputRef}
          autoCapitalize="none"
          placeholder={placeholder}
          editable={editable}
          value={isOpen ? searchText : getLabelForValue(field.value)}
          onChangeText={text => setSearchText(text)}
          onFocus={handleFocus}
          style={[
            styles.input,
            {backgroundColor: 'rgba(0,0,0,.02)', color: colors.text},
            hasError && styles.inputError,
            style,
          ]}
          {...inputProps}
        />

        {/* Right icons */}
        <View style={styles.rightIconContainer}>
          {!!field.value && (
            <TouchableOpacity
              onPress={handleClear}
              hitSlop={{top: 8, bottom: 8, left: 8, right: 8}}>
              <MyIcon
                family="MaterialIcons"
                name="cancel"
                size={20}
                color="#8E8E93"
              />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={handleToggle}
            disabled={!editable}
            hitSlop={{top: 8, bottom: 8, left: 8, right: 8}}>
            <MyIcon
              family="MaterialIcons"
              name={isOpen ? 'arrow-drop-up' : 'arrow-drop-down'}
              size={26}
              color="#8E8E93"
              style={{marginLeft: field.value ? 6 : 0}}
            />
          </TouchableOpacity>
        </View>

        {/* Dropdown */}
        {isOpen && (
          <View style={styles.dropdown}>
            {filteredItems.length === 0 ? (
              <View style={styles.emptyContainer}>
                <MyText style={{color: '#636366'}}>{emptyText}</MyText>
              </View>
            ) : (
              <ScrollView
                keyboardShouldPersistTaps="handled"
                nestedScrollEnabled
                style={{maxHeight: 240}}>
                {filteredItems.map((item, index) => {
                  const selected = item.value === field.value;
                  return (
                    <TouchableOpacity
                      key={`${item.value}-${index}`}
                      onPress={() => handleSelect(item)}
                      style={[
                        styles.itemContainer,
                        selected && styles.itemSelected,
                      ]}>
                      <MyText
                        style={[
                          styles.itemText,
                          selected && styles.itemTextSelected,
                        ]}>
                        {item.label}
                      </MyText>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            )}
          </View>
        )}
      </View>

      {hasError && (
        <MyText style={styles.errorText}>
          {String(formState.errors?.[name]?.message ?? '')}
        </MyText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    zIndex: Platform.OS === 'android' ? 10 : 0,
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
  rightIconContainer: {
    position: 'absolute',
    right: 8,
    top: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdown: {
    position: 'absolute',
    top: 54 + 6, // below input
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 2},
    elevation: 2,
    overflow: 'hidden',
  },
  itemContainer: {
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  itemSelected: {
    backgroundColor: 'rgba(0,0,0,0.04)',
  },
  itemText: {
    fontSize: 16,
    color: '#000',
  },
  itemTextSelected: {
    fontWeight: '600',
  },
  emptyContainer: {
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 14,
    marginTop: 4,
  },
});

export default MyComboBox;
