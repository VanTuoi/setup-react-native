/* eslint-disable max-lines-per-function */
import { zodResolver } from '@hookform/resolvers/zod';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { z } from 'zod';

import { useUser } from '@/api/user';
import { useUpdateUser } from '@/api/user/use-update-user';
import {
  ActivityIndicator,
  Button,
  FocusAwareStatusBar,
  Input,
  Text,
  View,
} from '@/components/ui';

const formSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(6),
  gender: z.string().min(1),
  status: z.enum(['active', 'block', 'graduated']),
});

type FormData = z.infer<typeof formSchema>;

export default function EditUser() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { mutate, isPending: loadingUpdate } = useUpdateUser();

  const {
    data,
    isPending: isLoadingGet,
    isError,
  } = useUser({ variables: { id } });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid, isSubmitted },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: '',
      name: '',
      email: '',
      phone: '',
      gender: '',
      status: 'active',
    },
  });

  useEffect(() => {
    if (data?.data) {
      const user = data.data;
      setValue('id', user.id);
      setValue('name', user.name);
      setValue('email', user.email);
      setValue('phone', user.phone);
      setValue('gender', user.gender);
      setValue('status', user.status);
    }
  }, [data]);

  const onSubmit = (values: FormData) => {
    mutate(values, {
      onSuccess: () => {
        showMessage({
          message: 'Success!',
          description: 'The User has been updated.',
          type: 'success',
          backgroundColor: '#22c55e',
          color: '#fff',
          icon: 'success',
          duration: 3000,
        });
        router.back();
      },
      onError: (err) => {
        showMessage({
          message: 'Error!',
          description: 'Failed to update user.',
          type: 'danger',
          backgroundColor: '#ef4444',
          color: '#fff',
          icon: 'danger',
          duration: 3000,
        });
        console.log('Update failed:', err);
      },
    });
  };

  if (isLoadingGet) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isError || !data?.data) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Error loading User</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 p-4">
      <Stack.Screen
        options={{
          title: `Edit ${data.data.name}`,
          headerBackTitle: 'Back',
        }}
      />
      <FocusAwareStatusBar />

      <View className="mt-6 space-y-3">
        {(['name', 'email', 'phone', 'gender', 'status'] as const).map(
          (field) => (
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
          )
        )}
      </View>

      <Button
        loading={loadingUpdate}
        disabled={isSubmitted && (loadingUpdate || !isValid)}
        className="mt-6"
        label="Save"
        onPress={handleSubmit(onSubmit)}
      />
    </ScrollView>
  );
}
