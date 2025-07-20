/* eslint-disable max-lines-per-function */
import { zodResolver } from '@hookform/resolvers/zod';
import { Stack, useRouter } from 'expo-router';
import { nanoid } from 'nanoid';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { z } from 'zod';

import { useCreateUser } from '@/api';
import {
  Button,
  FocusAwareStatusBar,
  Input,
  Text,
  View,
} from '@/components/ui';

const formSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(6, 'Phone must be at least 6 characters'),
  gender: z.string().min(1, 'Gender is required'),
  status: z.literal('active'),
});

type FormData = z.infer<typeof formSchema>;

export default function AddUser() {
  const router = useRouter();
  const { mutate, isPending: loadingCreate } = useCreateUser();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitted },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      gender: '',
      status: 'active',
    },
  });

  const onSubmit = (values: FormData) => {
    const user = {
      ...values,
      id: nanoid(8),
    };

    console.log('user', user);
    mutate(user, {
      onSuccess: () => {
        showMessage({
          message: 'User created successfully',
          type: 'success',
          backgroundColor: '#22c55e',
          color: '#fff',
          icon: 'success',
        });
        router.back();
      },
      onError: (err) => {
        showMessage({
          message: 'Failed to create user',
          type: 'danger',
          backgroundColor: '#ef4444',
          color: '#fff',
          icon: 'danger',
        });
        console.log('Create failed:', err);
      },
    });
  };

  return (
    <ScrollView className="flex-1 p-4">
      <Stack.Screen
        options={{
          title: 'Add User',
          headerBackTitle: 'Back',
        }}
      />
      <FocusAwareStatusBar />

      <View className="mt-6 space-y-3">
        {(['name', 'email', 'phone', 'gender'] as const).map((field) => (
          <Controller
            key={field}
            control={control}
            name={field}
            render={({ field: { onChange, value } }) => (
              <View>
                <Text className="mb-1 font-semibold capitalize">{field}</Text>
                <Input value={value} onChangeText={onChange} />
                {errors[field] && (
                  <Text className="text-xs text-red-500">
                    {errors[field]?.message?.toString()}
                  </Text>
                )}
              </View>
            )}
          />
        ))}
      </View>

      <Button
        loading={loadingCreate}
        disabled={isSubmitted && (loadingCreate || !isValid)}
        className="mt-6"
        label="Create"
        onPress={handleSubmit(onSubmit)}
      />
    </ScrollView>
  );
}
