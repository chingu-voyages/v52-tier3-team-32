'use client';

import React from 'react';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { useForm } from 'react-hook-form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

export default function () {
  const form = useForm();
  return (
    <section className="w-1/2 flex-1">
      <Form {...form}>
        <form action="" className="bg-[#1B1C20] p-5 rounded-xl h-full flex flex-col">
          <h2 className='text-white text-xl font-medium'>Make an <span className='text-[#8B53FB]'>Appoitment</span> Now! </h2>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-[#3D3E42]'>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="name..."
                    {...field}
                    className="bg-[#16151A] border-[#202024] text-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-[#3D3E42]'>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="email..."
                    {...field}
                    className="bg-[#16151A] border-[#202024] text-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-[#3D3E42]'>Phone number</FormLabel>
                <FormControl>
                  <Input
                    placeholder="number..."
                    {...field}
                    className="bg-[#16151A] border-[#202024] text-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-[#3D3E42]'>Address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="address..."
                    {...field}
                    className="bg-[#16151A] border-[#202024] text-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-[#3D3E42]'>Date</FormLabel>
                <FormControl>
                  <Input
                    placeholder="date..."
                    {...field}
                    className="bg-[#16151A] border-[#202024] text-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className='bg-[#8B53FB] h-12 font-light hover:bg-[#6438BD] text-lg text-white mt-auto mb-6 w-full'>Make an appoitment</Button>
        </form>
      </Form>
    </section>
  );
}
