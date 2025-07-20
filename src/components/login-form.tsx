import { Env } from '@env';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import * as z from 'zod';

import { Button, ControlledInput, Text, View } from '@/components/ui';

const schema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email('Invalid email format'),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(6, 'Password must be at least 6 characters'),
});

export type FormType = z.infer<typeof schema>;

export type LoginFormProps = {
  onSubmit?: SubmitHandler<FormType>;
};

export const LoginForm = ({ onSubmit = () => {} }: LoginFormProps) => {
  const { handleSubmit, control } = useForm<FormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: Env.APP_ENV === 'development' ? 'admin@gmail.com' : '',
      password: Env.APP_ENV === 'development' ? '123456' : '',
    },
  });
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={10}
    >
      <View className="flex-1 justify-center p-4">
        <View className="mb-6 items-center justify-center ">
          <Text
            testID="form-title"
            className="pb-6 text-center text-4xl font-bold"
          >
            Sign In
          </Text>

          {Env.APP_ENV === 'development' && (
            <>
              <Text className="max-w-xs text-center text-gray-500">
                Welcome! 👋 This is a demo login screen!
              </Text>
              <View className="items-start">
                <Text className="max-w-xs text-left text-gray-500">
                  Email demo is admin@gmail.com
                </Text>
                <Text className="max-w-xs text-left text-gray-500">
                  Password demo is 123456
                </Text>
              </View>
            </>
          )}
        </View>

        <ControlledInput
          testID="email-input"
          control={control}
          name="email"
          label="Email"
        />
        <ControlledInput
          testID="password-input"
          control={control}
          name="password"
          label="Password"
          placeholder="******"
          secureTextEntry={true}
        />
        <Button
          className="bg-primary-500"
          testID="login-button"
          label="Login"
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </KeyboardAvoidingView>
  );
};
