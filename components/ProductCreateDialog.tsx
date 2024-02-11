import { ShopDto } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Doc, setDoc, uploadFile } from '@junobuild/core-peer';
import { ControllerRenderProps, useForm } from 'react-hook-form';
import { z } from 'zod';
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
import { Button } from './ui/button';
import { ChangeEvent, useState } from 'react';
import { LoadingSpinner } from './LoadingSpinner';
import { Currencies, Sizes } from '@/lib/enums';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';
import { Info } from 'lucide-react';
import { nanoid } from 'nanoid';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Label } from './ui/label';
import Image from 'next/image';

const MAX_FILE_SIZE = 2097152;
const ALLOWED_FILE_TYPES = [
  'image/png',
  'image/jpeg',
  'image/gif',
  'image/webp',
];
const ALLOWED_QUANTITY = Array.from({ length: 50 }, (_, index) => index + 1);

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
  image: z.any(),
  quantity: z
    .number()
    .min(1, {
      message: 'Quantity must be at least 1.',
    })
    .max(50, {
      message: 'Maximum allowed quantity is 50 at the moment.',
    }),
  currency: z.string(),
  price: z.string(),
});

export interface ProductCreateDialogProps {
  triggerElement: JSX.Element;
  shop: Doc<ShopDto>;
}

export const ProductCreateDialog = ({
  triggerElement,
  shop,
}: ProductCreateDialogProps) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      image: undefined,
      quantity: 1,
      currency: Currencies.ICP,
      price: '0',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    const productId = nanoid();
    let imageUrl;

    try {
      if (values.image) {
        await uploadFile({
          data: values.image,
          collection: 'productImages',
        }).then((data) => (imageUrl = data.downloadUrl));
      }

      await setDoc<ShopDto>({
        collection: 'shops',
        doc: {
          ...shop,
          data: {
            ...shop.data,
            products: [
              ...(shop.data.products ?? []),
              {
                id: productId,
                imageUrl: imageUrl,
                title: values.title,
                description: values.description,
                quantity: values.quantity,
                currency: values.currency,
                price: values.price,
              },
            ],
          },
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const handleFileInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<
      {
        title: string;
        description: string;
        quantity: number;
        currency: string;
        price: string;
        image?: any;
      },
      'image'
    >
  ) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        form.setError('image', {
          type: 'manual',
          message: 'File size is too large',
        });
      } else if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        form.setError('image', {
          type: 'manual',
          message: 'File type not allowed',
        });
      } else {
        field.onChange(file);
        form.clearErrors('image');
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger asChild>{triggerElement}</DialogTrigger>
      <DialogContent className="min-w-fit">
        <DialogHeader>
          <DialogTitle>Add your product</DialogTitle>
          <DialogDescription>
            Set the name, the description and optionally upload a photo of your
            product.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product name</FormLabel>
                  <FormControl>
                    <Input placeholder="Chicken eggs" {...field} />
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
                  <FormLabel>Product description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="I offer organic chicken eggs from my free range chicken..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    Photo
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="w-5 h-5" />
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
            <div className="flex gap-4 justify-between">
              <div>
                <Label htmlFor="currency">Currency</Label>
                <div
                  className="font-medium flex items-center gap-1 mt-2"
                  id="currency"
                >
                  <Image
                    className="w-auto h-10"
                    src="/icp-token-white.svg"
                    alt="icp token"
                    width={0}
                    height={0}
                  />
                  ICP
                </div>
              </div>
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Value</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select quantity" />
                        </SelectTrigger>
                        <SelectContent>
                          {ALLOWED_QUANTITY.map((value) => (
                            <SelectItem key={value} value={value.toString()}>
                              {value}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button
                className="flex gap-2 items-center"
                disabled={loading}
                type="submit"
              >
                {loading && <LoadingSpinner size={Sizes.SM} />}
                Add product
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
