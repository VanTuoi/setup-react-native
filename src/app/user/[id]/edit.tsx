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
  Image,
  Input,
  Text,
  View,
} from '@/components/ui';

const formSchema = z.object({
  id: z.number(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(6),
  birthDate: z.string(),
  username: z.string(),
  image: z.string().url(),
});

type FormData = z.infer<typeof formSchema>;

export default function EditUser() {
  const router = useRouter();
  const local = useLocalSearchParams<{ id: string }>();
  const { mutate, isPending: loadingUpdate } = useUpdateUser();

  const {
    data,
    isPending: isLoadingGet,
    isError,
  } = useUser({
    variables: { id: local.id },
  });
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid, isSubmitted },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      birthDate: '',
      username: '',
      image: '',
    },
  });

  useEffect(() => {
    if (data) {
      setValue('id', data.id);
      setValue('firstName', data.firstName);
      setValue('lastName', data.lastName);
      setValue('email', data.email);
      setValue('phone', data.phone);
      setValue('birthDate', data.birthDate);
      setValue('username', data.username);
      setValue('image', data.image);
    }
  }, [data]);

  const onSubmit = (values: FormData) => {
    mutate(values, {
      onSuccess: () => {
        showMessage({
          message: 'Success!',
          description: 'The User status has been updated.',
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
          description: 'The User has been updated.',
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

  if (isError || !data) {
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
          title: `Edit ${data.firstName + data.lastName}`,
          headerBackTitle: 'Back',
        }}
      />
      <FocusAwareStatusBar />

      <View className="items-center space-y-4">
        <Controller
          control={control}
          name="image"
          render={({ field: { value } }) => (
            <>
              <Image
                source={{ uri: value }}
                className="size-40 rounded-xl"
                style={{ resizeMode: 'cover' }}
              />
            </>
          )}
        />
      </View>

      <View className="mt-6 space-y-3">
        {(
          [
            'firstName',
            'lastName',
            'email',
            'phone',
            'username',
            'birthDate',
          ] as const
        ).map((field) => (
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
        loading={loadingUpdate}
        disabled={isSubmitted && (loadingUpdate || isValid)}
        className="mt-6"
        label="Save"
        onPress={handleSubmit(onSubmit)}
      />
    </ScrollView>
  );
}
