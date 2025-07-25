import React from 'react';
import type { Control, FieldErrors } from 'react-hook-form';

import { type Course } from '@/api';
import { ControlledInput, ControlledSelect, View } from '@/components/ui';
import { translate } from '@/lib';

interface CourseFormFieldsProps {
  control: Control<Course>;
  errors?: FieldErrors<Course>;
  isEdit?: boolean;
  disabled?: boolean;
}

const statusOptions = [
  { label: translate('course.status.show'), value: 'show' },
  { label: translate('course.status.hidden'), value: 'hidden' },
];

export function CourseFormFields({
  control,
  isEdit = false,
}: CourseFormFieldsProps) {
  return (
    <View className="space-y-3">
      {isEdit && (
        <ControlledInput
          name="id"
          control={control}
          label={translate('course.form.id')}
          disabled={true}
          readOnly={true}
        />
      )}

      <ControlledInput
        name="name"
        control={control}
        label={translate('course.form.name')}
      />

      <ControlledInput
        name="image"
        control={control}
        label={translate('course.form.image')}
      />

      <ControlledInput
        name="price"
        control={control}
        label={translate('course.form.price')}
        keyboardType="numeric"
      />

      <ControlledInput
        name="description"
        control={control}
        label={translate('course.form.description')}
        multiline={true}
        numberOfLines={4}
      />

      <ControlledSelect
        name="status"
        control={control}
        label={translate('course.form.status')}
        options={statusOptions}
        placeholder={translate('course.form.status_placeholder')}
      />
    </View>
  );
}
