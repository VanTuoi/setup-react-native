/* eslint-disable max-lines-per-function */
import { zodResolver } from '@hookform/resolvers/zod';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { z } from 'zod';

import { useUpdateCourse } from '@/api';
import { useCourse } from '@/api/courses';
import { CourseFormFields } from '@/components/courses';
import {
  ActivityIndicator,
  Button,
  FocusAwareStatusBar,
  Text,
  View,
} from '@/components/ui';
import { translate } from '@/lib';

const formSchema = z.object({
  id: z.string(),
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

export default function EditCourse() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { mutate, isPending: loadingUpdate } = useUpdateCourse();

  const {
    data,
    isPending: isLoadingGet,
    isError,
  } = useCourse({ variables: { id: id as string } });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { isValid, isSubmitted },
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

  useEffect(() => {
    if (data?.data) {
      const course = data.data;
      setValue('id', course.id);
      setValue('name', course.name);
      setValue('image', course.image);
      setValue('price', course.price);
      setValue('description', course.description);
      setValue('status', course.status);
    }
  }, [data, setValue]);

  const onSubmit = (values: FormData) => {
    mutate(values, {
      onSuccess: () => {
        showMessage({
          message: translate('course.message.update_success'),
          type: 'success',
          backgroundColor: '#22c55e',
          color: '#fff',
          icon: 'success',
        });
        router.back();
      },
      onError: () => {
        showMessage({
          message: translate('course.message.update_fail'),
          type: 'danger',
          backgroundColor: '#ef4444',
          color: '#fff',
          icon: 'danger',
        });
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
        <Text>{translate('common.error_load')}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <ScrollView
        className="flex-1 p-4"
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        <Stack.Screen
          options={{
            title: translate('course.title.edit'),
            headerBackTitle: translate('course.back'),
          }}
        />
        <FocusAwareStatusBar />

        <View className="mt-6 space-y-3">
          <CourseFormFields control={control} isEdit={true} />
        </View>
      </ScrollView>

      <View className="absolute inset-x-0 bottom-0 p-4">
        <Button
          className="bg-green-500 dark:bg-green-700"
          textClassName="text-white font-bold dark:text-white"
          loading={loadingUpdate}
          disabled={isSubmitted && (loadingUpdate || !isValid)}
          label={translate('common.save')}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </View>
  );
}
