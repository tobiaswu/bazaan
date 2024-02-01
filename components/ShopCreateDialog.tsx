'use client';

import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { ShopDesignPicker } from './ShopDesignPicker';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Designs } from '@/lib/enums';
import { useForm } from 'react-hook-form';
import { nanoid } from 'nanoid';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { setDoc } from '@junobuild/core-peer';
import { ShopDto } from '@/lib/types';

const formSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: 'Name must be at least 2 characters.',
    })
    .max(60, {
      message: 'Name must not be longer than 60 characters.',
    }),
  description: z
    .string()
    .min(8, {
      message: 'Description must be at least 8 characters.',
    })
    .max(160, {
      message: 'Description must not be longer than 160 characters.',
    }),
  design: z.enum([Designs.EMERALD, Designs.SAPPHIRE, Designs.RUBY], {
    required_error: 'Please select a design.',
  }),
});

export interface ShopCreateDialogProps {
  triggerElement: JSX.Element;
}

export const ShopCreateDialog = ({ triggerElement }: ShopCreateDialogProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      design: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const shopId = nanoid();

    await setDoc<ShopDto>({
      collection: 'shops',
      doc: {
        key: shopId,
        data: { config: values },
      },
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{triggerElement}</DialogTrigger>
      <DialogContent className="min-w-fit">
        <DialogHeader>
          <DialogTitle>Create your shop</DialogTitle>
          <DialogDescription>
            Set a name, a description and choose a design for your shop.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shop name</FormLabel>
                  <FormControl>
                    <Input placeholder="My awesome shop" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shop description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="I'm selling..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="design"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shop design</FormLabel>
                  <FormControl>
                    <ShopDesignPicker
                      selectedDesign={field.value}
                      onSelect={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Create shop</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
