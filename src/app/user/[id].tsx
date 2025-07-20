/* eslint-disable max-lines-per-function */
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import * as React from 'react';

import { useUser } from '@/api/user';
import {
  ActivityIndicator,
  FocusAwareStatusBar,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from '@/components/ui';
import { EditIcon } from '@/components/ui/icons/edit';

export default function User() {
  const local = useLocalSearchParams<{ id: string }>();

  const { data, isPending, isError } = useUser({
    // @ts-ignore
    variables: { id: local.id },
  });
  const router = useRouter();

  const renderHeader = (title: string) => (
    <Stack.Screen
      options={{
        title,
        headerBackTitle: 'Feed',
        headerRight: () => (
          <TouchableOpacity
            onPress={() => {
              router.push(`/user/${local.id}/edit`);
            }}
            className="mr-3"
          >
            <EditIcon color="black" size={16} />
          </TouchableOpacity>
        ),
      }}
    />
  );

  if (isPending) {
    return (
      <View className="flex-1 items-center justify-center p-3">
        {renderHeader('User')}
        <FocusAwareStatusBar />
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isError || !data) {
    return (
      <View className="flex-1 items-center justify-center p-3">
        {renderHeader('User')}
        <FocusAwareStatusBar />
        <Text className="text-center text-red-500">Error loading user</Text>
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1 p-4"
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      {renderHeader(`${data.firstName} ${data.lastName}`)}
      <FocusAwareStatusBar />

      <View className="items-center space-y-4">
        <Image
          source={{ uri: data.image }}
          className="size-40 rounded-xl"
          style={{ resizeMode: 'cover' }}
        />
        <Text className="text-2xl font-bold">{`${data.firstName} ${data.lastName}`}</Text>
        <Text className="text-sm text-gray-600">Username: {data.username}</Text>
      </View>

      <View className="mt-6 space-y-3">
        <Text className="text-lg font-bold text-gray-800">Profile</Text>
        <Text>
          <Text className="font-semibold">Email:</Text> {data.email}
        </Text>
        <Text>
          <Text className="font-semibold">Phone:</Text> {data.phone}
        </Text>
        <Text>
          <Text className="font-semibold">Gender:</Text> {data.gender}
        </Text>
        <Text>
          <Text className="font-semibold">Birth Date:</Text> {data.birthDate}
        </Text>
        <Text>
          <Text className="font-semibold">Age:</Text> {data.age}
        </Text>
        <Text>
          <Text className="font-semibold">Blood Group:</Text> {data.bloodGroup}
        </Text>

        <Text className="mt-4 text-lg font-bold text-gray-800">Bodies</Text>
        <Text>
          <Text className="font-semibold">Height:</Text> {data.height} cm
        </Text>
        <Text>
          <Text className="font-semibold">Weight:</Text> {data.weight} kg
        </Text>
        <Text>
          <Text className="font-semibold">Eye Color:</Text> {data.eyeColor}
        </Text>
        <Text>
          <Text className="font-semibold">Hair:</Text> {data.hair.color},{' '}
          {data.hair.type}
        </Text>

        <Text className="mt-4 text-lg font-bold text-gray-800">Address</Text>
        <Text>
          <Text className="font-semibold">Street:</Text> {data.address.address}
        </Text>
        <Text>
          <Text className="font-semibold">City:</Text> {data.address.city}
        </Text>
        <Text>
          <Text className="font-semibold">State:</Text> {data.address.state} (
          {data.address.stateCode})
        </Text>
        <Text>
          <Text className="font-semibold">Country:</Text> {data.address.country}
        </Text>
        <Text>
          <Text className="font-semibold">Postal Code:</Text>{' '}
          {data.address.postalCode}
        </Text>

        <Text className="mt-4 text-lg font-bold text-gray-800">
          Work and education
        </Text>
        <Text>
          <Text className="font-semibold">University:</Text> {data.university}
        </Text>
        <Text>
          <Text className="font-semibold">Company:</Text> {data.company.name}
        </Text>
        <Text>
          <Text className="font-semibold">Department:</Text>{' '}
          {data.company.department}
        </Text>
        <Text>
          <Text className="font-semibold">Title:</Text> {data.company.title}
        </Text>

        <Text className="mt-4 text-lg font-bold text-gray-800">Banking</Text>
        <Text>
          <Text className="font-semibold">Card Type:</Text> {data.bank.cardType}
        </Text>
        <Text>
          <Text className="font-semibold">Card Number:</Text>{' '}
          {data.bank.cardNumber}
        </Text>
        <Text>
          <Text className="font-semibold">Card Expiry:</Text>{' '}
          {data.bank.cardExpire}
        </Text>
        <Text>
          <Text className="font-semibold">IBAN:</Text> {data.bank.iban}
        </Text>

        <Text className="mt-4 text-lg font-bold text-gray-800">Crypto</Text>
        <Text>
          <Text className="font-semibold">Coin:</Text> {data.crypto.coin}
        </Text>
        <Text>
          <Text className="font-semibold">Wallet:</Text> {data.crypto.wallet}
        </Text>
        <Text>
          <Text className="font-semibold">Network:</Text> {data.crypto.network}
        </Text>

        <Text className="mt-4 text-lg font-bold text-gray-800">Orther</Text>
        <Text>
          <Text className="font-semibold">Role:</Text> {data.role}
        </Text>
        <Text>
          <Text className="font-semibold">MAC:</Text> {data.macAddress}
        </Text>
        <Text>
          <Text className="font-semibold">IP:</Text> {data.ip}
        </Text>
        <Text>
          <Text className="font-semibold">User Agent:</Text> {data.userAgent}
        </Text>
        <Text>
          <Text className="font-semibold">SSN:</Text> {data.ssn}
        </Text>
        <Text>
          <Text className="font-semibold">EIN:</Text> {data.ein}
        </Text>
      </View>
    </ScrollView>
  );
}
