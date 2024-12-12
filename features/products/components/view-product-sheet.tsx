import { useOpenProduct } from "../hooks/use-open-product";

import { useGetProduct } from "../api/use-get-product";
import ProductSheet from "./product-sheet";

// const formSchema = insertCategorySchema.pick({
//   name: true,
// });

// type FormValues = z.input<typeof formSchema>;


export const ViewProductSheet = () => {
  const { isOpen, onClose, id } = useOpenProduct();
  const productQuery = useGetProduct(id);

  const product = productQuery.data; 

  

  // const mutation = useCreateCategory();
  // const onSubmit = (values: FormValues) => {
  //   mutation.mutate(values, {
  //     onSuccess: () => {
  //       onClose();
  //     }
  //   });
  // }
  
  return (
    <ProductSheet open={isOpen} onOpenChange={onClose} product={product!} isLoading={productQuery.isLoading}/>
  );
};