import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from './ui/card';

export default function PostCardLoadingSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='block whitespace-nowrap w-[200px] overflow-hidden text-ellipsis'>
          <div className='w-full h-6 bg-gray-200 rounded'></div>
        </CardTitle>
        <CardDescription className='block whitespace-nowrap w-[200px] overflow-hidden text-ellipsis'>
          <div className='w-full h-5 bg-gray-200 rounded'></div>
        </CardDescription>
      </CardHeader>
      <CardContent className='block whitespace-nowrap w-[350px] overflow-hidden text-ellipsis'>
        <div className='w-full h-5 bg-gray-200 rounded'></div>
      </CardContent>
      <CardFooter>
        <div className='w-[200px] h-10 bg-gray-200 rounded'></div>
      </CardFooter>
    </Card>
  );
}
