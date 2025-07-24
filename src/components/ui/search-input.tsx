import React from 'react';
import { TextInput, type TextInputProps, View } from 'react-native';

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
} & TextInputProps;

export const SearchInput = ({
  value,
  onChangeText,
  placeholder = 'Search',
  ...props
}: Props) => {
  return (
    <View className="relative w-full">
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#999"
        className="h-10 rounded-lg border border-gray-300 pl-2 text-black dark:border-gray-600 dark:text-white"
        {...props}
      />
    </View>
  );
};
