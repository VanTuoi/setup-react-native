/* eslint-disable max-lines-per-function */
import { zodResolver } from '@hookform/resolvers/zod';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { z } from 'zod';

import { useCreateUser } from '@/api';
import { Button, FocusAwareStatusBar } from '@/components/ui';
import { UserFormFields } from '@/components/user/user-form-fields';
import { translate } from '@/lib';

const formSchema = z.object({
  id: z
    .string()
    .min(
      1,
      `${translate('new_user.form.id')} ${translate('new_user.validate.required')}`
    ),

  name: z
    .string()
    .min(
      1,
      `${translate('new_user.form.name')} ${translate('new_user.validate.required')}`
    ),

  email: z
    .string()
    .email(translate('new_user.validate.email_invalid'))
    .min(
      1,
      `${translate('new_user.form.email')} ${translate('new_user.validate.required')}`
    ),

  phone: z
    .string()
    .min(6, translate('new_user.validate.phone_min'))
    .min(
      1,
      `${translate('new_user.form.phone')} ${translate('new_user.validate.required')}`
    ),

  gender: z
    .string()
    .min(
      1,
      `${translate('new_user.form.gender')} ${translate('new_user.validate.required')}`
    ),

  status: z.enum(['active', 'block', 'graduated']),
});

type FormData = z.infer<typeof formSchema>;

export default function AddUser() {
  const router = useRouter();
  const { mutate, isPending: loadingCreate } = useCreateUser();

  const {
    control,
    handleSubmit,
    formState: { isValid, isSubmitted },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: 'B1234567',
      name: '',
      email: '',
      phone: '',
      gender: '',
      status: 'active',
    },
  });

  const onSubmit = (values: FormData) => {
    mutate(values, {
      onSuccess: () => {
        showMessage({
          message: translate('new_user.message.create_success'),
          type: 'success',
          backgroundColor: '#22c55e',
          color: '#fff',
          icon: 'success',
        });
        router.back();
      },
      onError: () => {
        showMessage({
          message: translate('new_user.message.create_fail'),
          type: 'danger',
          backgroundColor: '#ef4444',
          color: '#fff',
          icon: 'danger',
        });
      },
    });
  };

  return (
    <ScrollView className="flex-1 p-4">
      <Stack.Screen
        options={{
          title: translate('new_user.title'),
          headerBackTitle: translate('new_user.back'),
        }}
      />
      <FocusAwareStatusBar />

      <UserFormFields control={control} />

      <Button
        loading={loadingCreate}
        disabled={isSubmitted && (loadingCreate || !isValid)}
        className="mt-6"
        label={translate('new_user.form.create')}
        onPress={handleSubmit(onSubmit)}
      />
    </ScrollView>
  );
}
