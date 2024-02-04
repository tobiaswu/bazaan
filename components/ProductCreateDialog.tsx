import { ProductDto } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { setDoc, uploadFile } from '@junobuild/core-peer';
import { nanoid } from 'nanoid';
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
import { ChangeEvent } from 'react';

const MAX_FILE_SIZE = 2097152;
const ALLOWED_FILE_TYPES = [
  'image/png',
  'image/jpeg',
  'image/gif',
  'image/webp',
];

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
  isActive: z.boolean(),
  shopId: z.string().length(21),
  // quantity: z
  //   .number()
  //   .min(1, {
  //     message: 'Quantity must be at least 1.',
  //   })
  //   .max(50, {
  //     message: 'Maximum allowed quantity is 50 at the moment.',
  //   }),
  // currency: z.string(),
  // value: z.number(),
});

export interface ProductCreateDialogProps {
  triggerElement: JSX.Element;
  shopId: string;
}

export const ProductCreateDialog = ({
  triggerElement,
  shopId,
}: ProductCreateDialogProps) => {
  // const quantityValues = Array.from({ length: 50 }, (_, index) => index + 1);
  // const currencies = ['ICP', 'ckBTC', 'ckETH'];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      image: undefined,
      isActive: false,
      shopId: shopId,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const productId = nanoid();

    const { downloadUrl } = await uploadFile({
      data: values.image,
      collection: 'productImages',
    });

    await setDoc<ProductDto>({
      collection: 'products',
      doc: {
        key: productId,
        data: {
          imageUrls: [downloadUrl],
          shopId: values.shopId,
          title: values.title,
          description: values.description,
          isActive: values.isActive,
        },
      },
    });
  };

  const handleFileInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<
      {
        shopId: string;
        title: string;
        description: string;
        isActive: boolean;
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
    <Dialog>
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
                  <FormLabel>Photo (file size limit: 2MB)</FormLabel>
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
            {/* <div className="flex gap-2 justify-between">
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select the quantity" />
                        </SelectTrigger>
                        <SelectContent>
                          {quantityValues.map((value) => (
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
              <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Currency</FormLabel>
                    <FormControl>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select the currency" />
                        </SelectTrigger>
                        <SelectContent>
                          {currencies.map((currency) => (
                            <SelectItem key={currency} value={currency}>
                              {currency}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="value"
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
            </div> */}
            <DialogFooter>
              <Button type="submit">Add product</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
