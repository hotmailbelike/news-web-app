import { useRouter } from 'next/router';

export default function Home() {
	const router = useRouter();

	return router.push('/Home');
}
