import { Alert, ScrollView, Text, View } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { Link, router } from 'expo-router';
import { createUser } from '../../lib/appwrite';

const SignUp = () => {
  const [isSubmitting, setSubmitting] = useState(false);
  const [error, setError] = useState(""); // New state for error messages
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });

  const submit = async () => {
    // Basic form validation for empty fields
    if (form.username === "" || form.email === "" || form.password === "") {
      setError("Please fill in all fields"); // Set error state instead of alert
      return;
    }

    setSubmitting(true);
    setError(""); // Clear previous error messages

    try {
      await createUser(form.username, form.email, form.password);

      alert('Sign-up successful!');
      router.replace('/sign-in'); // Navigate to sign-in after successful signup
    } catch (error) {
      setError(`Error during sign-up: ${error.message || error}`); // Set error state for UI display
    } finally {
      setSubmitting(false); // Always reset submitting state
    }
  };

  return (
    <SafeAreaView className="bg-black h-full">
      <ScrollView>
        <View className="w-full flex justify-center h-full px-4 my-6">
          <View className="bg-white max-w-md w-full p-6 rounded-xl shadow-lg mx-auto">

            <Text className="text-2xl text-black font-bold text-center justify-center items-center text-semibold">
              Signup to P & D
            </Text>

            <FormField
              title="Username"
              value={form.username}
              handleChangeText={(e) => setForm({ ...form, username: e })}
              otherStyles="mt-10"
            />

            <FormField
              title="Email"
              value={form.email}
              handleChangeText={(e) => setForm({ ...form, email: e })}
              otherStyles="mt-7"
              keyboardType="email-address"
            />

            <FormField
              title="Password"
              value={form.password}
              handleChangeText={(e) => setForm({ ...form, password: e })}
              otherStyles="mt-7"
            />

            {error && (
              <Text className="text-red-500 text-center mt-4">{error}</Text>
            )}

            <CustomButton
              title="Sign Up"
              handlePress={submit}
              containerStyles="mt-5"
              isLoading={isSubmitting}
            />

            <View className="flex justify-center pt-5 flex-row gap-2">
              <Text className="text-lg text-gray-100 font-pregular">
                Have an account already?
              </Text>
              <Link href="/sign-in" className="text-lg font-psemibold text-secondary">
                Sign in
              </Link>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;


