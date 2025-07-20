// /* eslint-disable max-lines-per-function */
// import type { BottomSheetModal } from '@gorhom/bottom-sheet';
// import { useCallback, useEffect, useRef } from 'react';
// import { ActivityIndicator, Pressable, Text } from 'react-native';
// import { showMessage } from 'react-native-flash-message';

// import { type Student } from '@/api/students';
// import { useChangeStatusUser } from '@/api/students/use-change-status-student';
// import { Options, type OptionType } from '@/components/ui/select';

// type Props = {
//   student: Student;
// };

// const statusColors: Record<Student['status'], string> = {
//   active: 'bg-green-100',
//   block: 'bg-red-100',
//   graduated: 'bg-yellow-100',
// };

// const textColors: Record<Student['status'], string> = {
//   active: 'text-green-800',
//   block: 'text-red-800',
//   graduated: 'text-yellow-800',
// };

// export const StudentStatusItem = ({ student }: Props) => {
//   const changeStatus = useChangeStatusUser();
//   const modalRef = useRef<BottomSheetModal>(null);

//   const options: OptionType[] = [
//     { label: 'Active', value: 'active' },
//     { label: 'Blocked', value: 'block' },
//     { label: 'Graduated', value: 'graduated' },
//   ];

//   const handleSelect = useCallback(
//     (option: OptionType) => {
//       changeStatus.mutate({
//         id: student.id,
//         status: option.value as Student['status'],
//       });
//     },
//     [student.id, changeStatus]
//   );

//   useEffect(() => {
//     if (changeStatus.isSuccess) {
//       modalRef.current?.dismiss();
//       showMessage({
//         message: 'Success!',
//         description: 'The student status has been updated.',
//         type: 'success',
//         backgroundColor: '#ef4444',
//         color: '#fff',
//         icon: 'success',
//         duration: 3000,
//       });
//     }
//   }, [changeStatus.isSuccess]);

//   useEffect(() => {
//     if (changeStatus.isError) {
//       showMessage({
//         message: 'Error!',
//         description: 'The student status has not been updated.',
//         type: 'danger',
//         backgroundColor: '#ef4444',
//         color: '#fff',
//         icon: 'danger',
//         duration: 3000,
//       });
//     }
//   }, [changeStatus.isError]);

//   const statusLabel =
//     options.find((o) => o.value === student.status)?.label ?? student.status;

//   return (
//     <>
//       <Pressable
//         className={`rounded-md px-3 py-2 ${statusColors[student.status]} flex-row items-center justify-center`}
//         onPress={() => modalRef.current?.present()}
//         disabled={changeStatus.isPending}
//       >
//         {changeStatus.isPending ? (
//           <ActivityIndicator size="small" color="#000" />
//         ) : (
//           <Text
//             className={`text-sm font-semibold ${textColors[student.status]}`}
//           >
//             {statusLabel}
//           </Text>
//         )}
//       </Pressable>

//       <Options
//         ref={modalRef}
//         options={options}
//         value={student.status}
//         onSelect={handleSelect}
//         testID={`student-${student.id}-status`}
//       />
//     </>
//   );
// };
