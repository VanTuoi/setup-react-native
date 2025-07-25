import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { type Course } from '@/api/courses';

import { CaretDown } from '../ui/icons';
import { CourseStatusItem } from './course-status-item';

type CourseItemProps = {
  item: Course;
  isGrid?: boolean;
};

// eslint-disable-next-line max-lines-per-function
export const CoursesItem = ({ item, isGrid = false }: CourseItemProps) => {
  const [showDetail, setShowDetail] = useState(false);
  const rotate = useSharedValue(0);
  const detailOpacity = useSharedValue(0);
  const detailScale = useSharedValue(0.95);
  const router = useRouter();

  const iconAnimatedStyle = useAnimatedStyle(() => {
    return {
      paddingHorizontal: 4,
      transform: [{ rotate: `${rotate.value}deg` }],
    };
  });

  const detailAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: detailOpacity.value,
      transform: [{ scaleY: detailScale.value }],
    };
  });

  const toggle = () => {
    const next = !showDetail;
    setShowDetail(next);

    rotate.value = withTiming(next ? 90 : 0, { duration: 250 });
    detailOpacity.value = withTiming(next ? 1 : 0, { duration: 250 });
    detailScale.value = withTiming(next ? 1 : 0.95, { duration: 250 });
  };

  return (
    <View
      className={`${
        isGrid ? 'w-[95%]' : 'w-full'
      } mb-1 rounded-xl border border-gray-200 p-2 dark:border-neutral-600 dark:bg-neutral-900`}
    >
      <View className="flex-row items-center justify-between">
        <Pressable
          onPress={() => router.push(`/courses/${item.id}`)}
          className="flex-1"
        >
          <View className="space-y-1">
            <Text className="text-sm font-bold text-black dark:text-gray-400">
              {`${item.name} (${item.id})`}
            </Text>
            <Text className="text-sm text-black dark:text-gray-400">
              {item.price}
            </Text>
          </View>
        </Pressable>

        {!isGrid && (
          <View className="flex-row items-center gap-2">
            <CourseStatusItem Course={item} />
            <Pressable onPress={toggle} hitSlop={10}>
              <Animated.View style={iconAnimatedStyle}>
                <CaretDown width={14} height={14} color="#999" />
              </Animated.View>
            </Pressable>
          </View>
        )}
      </View>

      {!isGrid && showDetail && (
        <Animated.View style={[detailAnimatedStyle]} className="mt-2 space-y-1">
          <Text className="text-sm text-black dark:text-gray-400">
            {item.description}
          </Text>
        </Animated.View>
      )}
    </View>
  );
};
