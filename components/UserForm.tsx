'use client';

import { userSchema } from '@/ValidationSchemas/users';
import { z } from 'zod';
import axios from 'axios';

import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { useState } from 'react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { User } from '@prisma/client';

type UserFormData = z.infer<typeof userSchema>;

interface UserFormProps {
  user?: User;
}

export default function UserForm({ user }: UserFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const form = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });

  const router = useRouter();

  async function onSubmit(values: z.infer<typeof userSchema>) {
    try {
      setIsSubmitting(true);
      setError('');

      // If there is user, proceed to update, otherwise create a new user
      if (user) {
        await axios.patch('/api/users/' + user.id, values);
        toast.success('User updated successfully😎');
        setIsSubmitting(false);
      } else {
        await axios.post('/api/users', values);
        toast.success('New user created successfully🎉');
        setIsSubmitting(false);
      }

      router.push('/users');
      router.refresh();
    } catch (error) {
      console.log(error);
      setError('Error updating user. Please try again!');
      setIsSubmitting(false);
    }
  }

  return (
    <div className="rounded-md border w-full p-5 ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            defaultValue={user?.name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Full Name" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Username */}
          <FormField
            control={form.control}
            name="username"
            defaultValue={user?.username}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            defaultValue=""
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    required={user ? false : true}
                    placeholder="Password"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="flex gap-6">
            {/* Role */}
            <FormField
              control={form.control}
              name="role"
              defaultValue={user?.role}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder="Role"
                          defaultValue={user?.role}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="ADMIN">Admin</SelectItem>
                      <SelectItem value="TECH">Tech</SelectItem>
                      <SelectItem value="USER">User</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" disabled={isSubmitting}>
            {user ? 'Update user' : 'Create new user'}
          </Button>
        </form>
      </Form>
      <p className="text-destructive">{error}</p>
    </div>
  );
}
