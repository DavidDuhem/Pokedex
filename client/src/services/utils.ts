import { z } from 'zod';

interface ApiHandlerOptions<T, R> {
	schema: z.ZodSchema<T>;
	data: T;
	request: (validatedData: T) => Promise<R>;
	onSuccess?: (result: R) => void;
	onError?: (message: string) => void;
	onLoading?: (isLoading: boolean) => void;
}

export async function requestApi<T, R>({
	schema,
	data,
	request,
	onSuccess,
	onError,
	onLoading
}: ApiHandlerOptions<T, R>) {
	onError?.('');
	onLoading?.(true);

	const validation = schema.safeParse(data);
	if (!validation.success) {
		onError?.(validation.error.errors[0].message);
		onLoading?.(false);
		return;
	}

	try {
		onLoading?.(true);
		const response = await request(validation.data);
		onSuccess?.(response);
	} catch (err: any) {
		const msg = err.response?.data?.message || err.message || 'Erreur inconnue';
		onError?.(msg);
	} finally {
		onLoading?.(false);
	}
}
