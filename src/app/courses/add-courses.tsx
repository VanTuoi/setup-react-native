/* eslint-disable max-lines-per-function */
import { zodResolver } from '@hookform/resolvers/zod';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { z } from 'zod';

import { useCreateCourse } from '@/api';
import { CourseFormFields } from '@/components/courses/courses-form-fields';
import { Button, FocusAwareStatusBar, View } from '@/components/ui';
import { translate } from '@/lib';

const formSchema = z.object({
  id: z
    .string()
    .min(
      1,
      `${translate('course.form.id')} ${translate('course.validate.required')}`
    ),
  name: z
    .string()
    .min(
      1,
      `${translate('course.form.name')} ${translate('course.validate.required')}`
    ),
  image: z
    .string()
    .url(translate('course.validate.image_url'))
    .min(
      1,
      `${translate('course.form.image')} ${translate('course.validate.required')}`
    ),
  price: z.number().min(1, translate('course.validate.price_min')),
  description: z
    .string()
    .min(10, translate('course.validate.description_min'))
    .min(
      1,
      `${translate('course.form.description')} ${translate('course.validate.required')}`
    ),
  status: z.enum(['show', 'hidden']),
});

type FormData = z.infer<typeof formSchema>;

export default function AddCourse() {
  const router = useRouter();
  const { mutate, isPending: loadingCreate } = useCreateCourse();

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: '',
      name: '',
      image: '',
      price: 0,
      description: '',
      status: 'show',
    },
  });

  const onSubmit = (values: FormData) => {
    mutate(values, {
      onSuccess: () => {
        showMessage({
          message: translate('course.message.create_success'),
          type: 'success',
          backgroundColor: '#22c55e',
          color: '#fff',
          icon: 'success',
        });
        router.back();
      },
      onError: () => {
        showMessage({
          message: translate('course.message.create_fail'),
          type: 'danger',
          backgroundColor: '#ef4444',
          color: '#fff',
          icon: 'danger',
        });
      },
    });
  };

  return (
    <View className="flex-1">
      <ScrollView
        className="flex-1 p-4"
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        <Stack.Screen
          options={{
            title: translate('course.title.create'),
            headerBackTitle: translate('course.back'),
          }}
        />
        <FocusAwareStatusBar />

        <CourseFormFields control={control} />
      </ScrollView>

      <View className="absolute inset-x-0 bottom-0 p-4">
        <Button
          variant="secondary"
          textClassName="text-white font-bold"
          loading={loadingCreate}
          disabled={loadingCreate || !isValid}
          label={translate('course.form.create')}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </View>
  );
}
