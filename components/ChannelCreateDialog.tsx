import { useForm } from 'react-hook-form';
import { ChannelCitySelect } from './ChannelCitySelect';
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { nanoid } from 'nanoid';
import { setDoc } from '@junobuild/core-peer';
import { ChannelDto } from '@/lib/types';
import { LoadingSpinner } from './LoadingSpinner';
import { useState } from 'react';
import { Sizes } from '@/lib/enums';
import { useRouter } from 'next/navigation';
import { RouteId } from '@/lib';

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
  city: z.string().min(1, {
    message: 'Please select a city.',
  }),
});

export interface ChannelCreateDialogProps {
  triggerElement: JSX.Element;
}

export const ChannelCreateDialog = ({
  triggerElement,
}: ChannelCreateDialogProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      city: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const channelId = nanoid();
    setLoading(true);

    await setDoc<ChannelDto>({
      collection: 'channels',
      doc: {
        key: channelId,
        data: values,
      },
    }).finally(() => {
      setLoading(false);
      setOpen(false);
      router.push(RouteId.channel(channelId));
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild={open}>{triggerElement}</DialogTrigger>
      <DialogContent className="min-w-fit">
        <DialogHeader>
          <DialogTitle>Create a channel</DialogTitle>
          <DialogDescription>
            Set a name, a description and the location of your channel.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Channel name</FormLabel>
                  <FormControl>
                    <Input placeholder="Local channel" {...field} />
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
                  <FormLabel>Channel description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="This channel is about..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Channel location</FormLabel>
                  <FormControl>
                    <ChannelCitySelect
                      selectedValue={field.value}
                      onSelect={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                className="flex gap-2 items-center"
                disabled={loading}
                type="submit"
              >
                {loading && <LoadingSpinner size={Sizes.SM} />}
                Create channel
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
