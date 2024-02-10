'use client';

import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ProfileCountrySelect } from '@/components/ProfileCountrySelect';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { RouteId } from '@/lib';
import { Sizes } from '@/lib/enums';
import { ProfileDto } from '@/lib/types/ProfileDto';
import { zodResolver } from '@hookform/resolvers/zod';
import { setDoc, uploadFile } from '@junobuild/core-peer';
import { Info } from 'lucide-react';
import { nanoid } from 'nanoid';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';
import { ControllerRenderProps, useForm } from 'react-hook-form';
import { z } from 'zod';

const MAX_FILE_SIZE = 2097152;
const ALLOWED_FILE_TYPES = [
  'image/png',
  'image/jpeg',
  'image/gif',
  'image/webp',
];

const formSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: 'Username must be at least 2 characters.',
    })
    .max(24, {
      message: 'Username must not be longer than 24 characters.',
    }),
  country: z.string().min(1, {
    message: 'Please select a country.',
  }),
  avatar: z.any().optional(),
});

export default function Onboarding() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      country: '',
      avatar: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const profileId = nanoid();
    setLoading(true);

    const { downloadUrl } = await uploadFile({
      data: values.avatar,
      collection: 'avatars',
    });

    await setDoc<ProfileDto>({
      collection: 'profiles',
      doc: {
        data: {
          username: values.username,
          country: values.country,
          avatarUrl: downloadUrl,
        },
        key: profileId,
      },
    }).finally(() => {
      setLoading(false);
      router.push(RouteId.discovery);
    });
  };

  const handleFileInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<
      {
        username: string;
        country: string;
        avatar?: any;
      },
      'avatar'
    >
  ) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        form.setError('avatar', {
          type: 'manual',
          message: 'File size is too large',
        });
      } else if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        form.setError('avatar', {
          type: 'manual',
          message: 'File type not allowed',
        });
      } else {
        field.onChange(file);
        form.clearErrors('avatar');
      }
    }
  };

  return (
    <div className="absolute w-full h-full top-0 left-0 bg-slate-400 bg-opacity-70 backdrop-blur-sm">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Card>
          <CardHeader>
            <CardTitle>Complete your profile</CardTitle>
            <CardDescription>
              Before you can access the platform please set a username and
              select the country you live in. If you like you can upload an
              avatar.
            </CardDescription>
          </CardHeader>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent>
              <Form {...form}>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          Country
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Info className="text-sm" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>
                                  Currently only available in the USA. More
                                  countries coming soon!
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </FormLabel>
                        <FormControl>
                          <ProfileCountrySelect
                            selectedValue={field.value}
                            onSelect={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="avatar"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          Avatar
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Info className="text-sm" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>File size limit: 2MB</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileInputChange(e, field)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </Form>
            </CardContent>
            <CardFooter>
              <Button
                className="flex gap-2 items-center"
                disabled={loading}
                type="submit"
              >
                {loading && <LoadingSpinner size={Sizes.SM} />}
                Save changes
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
