import { getItem, setItem } from '@/lib/storage';

import { type ResponseData } from '../types';
import type { Course } from './types';

function delay(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

const KEY = 'mock_Courses';

const mockCourses: Course[] = Array.from({ length: 50 }, (_, i) => {
  const index = i + 1;
  const id = `C12345${(index + 60).toString().padStart(2, '0')}`;

  const status = i % 2 === 0 ? 'show' : 'hidden';
  const price = (index * 5 + 1) * 1000;

  return {
    id,
    name: `Course #${index}: Learn Skill ${index}`,
    price,
    image: `https://picsum.photos/seed/course${index}/300/200`,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    status,
  };
});

export async function getCoursesMock({
  search,
}: {
  search?: string;
}): Promise<ResponseData<Course[]>> {
  await delay(1000);

  let Courses = getItem<Course[]>(KEY);

  if (!Array.isArray(Courses) || Courses.length === 0) {
    Courses = mockCourses;
    await setItem(KEY, Courses);
  }

  const filteredCourses = search
    ? Courses.filter((Course) =>
        Course.name.toLowerCase().includes(search.toLowerCase())
      )
    : Courses;

  return {
    message: 'Mocked Course list',
    success: true,
    data: filteredCourses,
  };
}

export async function getCourseMock(id: string): Promise<ResponseData<Course>> {
  await delay(1000);

  const Courses = getItem<Course[]>(KEY) || [];

  const Course = Courses.find((u) => u.id === id) || null;

  return {
    message: Course ? 'Found Course' : 'Course not found',
    success: !!Course,
    data: Course,
  };
}

export async function createCourseMock(
  Course: Course
): Promise<ResponseData<Course>> {
  await delay(1000);

  let Courses = getItem<Course[]>(KEY) || [];

  if (Courses.some((u) => u.id === Course.id)) {
    return {
      message: 'Course ID already exists',
      success: false,
      data: null,
    };
  }

  Courses.push(Course);
  await setItem(KEY, Courses);

  return {
    message: 'Course created successfully',
    success: true,
    data: Course,
  };
}

export async function updateCourseMock(
  update: Partial<Course> & { id: string }
): Promise<ResponseData<Course>> {
  await delay(1000);

  let Courses = getItem<Course[]>(KEY) || [];
  const index = Courses.findIndex((u) => u.id === update.id);

  if (index === -1) {
    return {
      message: 'Course not found',
      success: false,
      data: null,
    };
  }

  const updatedCourse = { ...Courses[index], ...update };
  Courses[index] = updatedCourse;

  await setItem(KEY, Courses);

  return {
    message: 'Course updated successfully',
    success: true,
    data: updatedCourse,
  };
}

export async function changeStatusCourseMock(
  id: string,
  status: 'show' | 'hidden'
): Promise<ResponseData<Course>> {
  await delay(1000);

  let Courses = getItem<Course[]>(KEY) || [];
  const index = Courses.findIndex((u) => u.id === id);

  if (index === -1) {
    return {
      message: 'Course not found',
      success: false,
      data: null,
    };
  }

  const updatedCourse = { ...Courses[index], status };
  Courses[index] = updatedCourse;

  await setItem(KEY, Courses);

  return {
    message: 'Course status changed',
    success: true,
    data: updatedCourse,
  };
}

export async function deleteCourseMock(
  id: string
): Promise<ResponseData<null>> {
  await delay(1000);

  let Courses = getItem<Course[]>(KEY) || [];
  const index = Courses.findIndex((u) => u.id === id);

  if (index === -1) {
    return {
      message: 'Course not found',
      success: false,
      data: null,
    };
  }

  Courses.splice(index, 1);
  await setItem(KEY, Courses);

  return {
    message: 'Course deleted successfully',
    success: true,
    data: null,
  };
}
