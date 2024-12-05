import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@rogerogers/ui/dialog';
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@rogerogers/ui/form';
import { Input } from '@rogerogers/ui/input';
import { Eye, Trash2, Upload as UploadIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
import { NextImage } from './next-image';

export enum UploadType {
  Image,
  Video,
}

export default function Upload({
  onChange,
  //   v,
  label,
  uploadType,
}: {
  onChange: any;
  //   v?: string;
  label?: string;
  uploadType?: UploadType;
}) {
  const [show, setShow] = useState<boolean>(false);
  const [v, setV] = useState<string>('');

  //   v =
  //     'https://ro-scontent.oss-us-west-1.aliyuncs.com/products/5594bd67-ed0d-407f-b823-6f60c51244b0.mp4';
  const dialogContent = useMemo(() => {
    if (typeof v === 'undefined') {
      return;
    }
    switch (uploadType) {
      case UploadType.Image:
        return <NextImage src={v} />;
      case UploadType.Video:
        return <video src={v} controls />;
      default:
        return v;
    }
  }, [uploadType, v]);

  return (
    <FormItem className="max-w-[400px]">
      <FormLabel>
        {label}
        <br />
        <br />
        <div
          className="h-[200px] w-[200px] light:bg-gray-50 dark:bg-gray-600 flex justify-center items-center"
          onMouseEnter={() => {
            setShow(true);
          }}
          onMouseLeave={() => {
            setShow(false);
          }}
          onMouseOver={() => {
            setShow(true);
          }}
        >
          {v ? (
            // <video className="h-full" src={v} controls />
            <div className={`${show ? 'block' : 'hidden'}`}>
              <div className="flex space-x-6">
                <Dialog>
                  <DialogTrigger>
                    <Eye className="hover:cursor-pointer" />
                  </DialogTrigger>
                  <DialogContent>
                    <DialogTitle>{dialogContent}</DialogTitle>
                    <DialogDescription>资源预览</DialogDescription>
                  </DialogContent>
                </Dialog>
                <Trash2 className="hover:cursor-pointer" />
              </div>
            </div>
          ) : (
            <div>
              <UploadIcon className="hover:cursor-pointer" />
            </div>
          )}
        </div>
      </FormLabel>
      <FormControl>
        <Input
          className="hidden"
          multiple={true}
          placeholder={'video'}
          type="file"
          onChange={async (e) => {
            const result = await onChange(e);
            if (result) {
              setV(result);
            }
          }}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}
