import { createAliyunStsToken } from '@/service/client';
import { useAliyunStsState } from '@/stores/data-store';
import { genUuidv4 } from '@rogerogers/next-common/lib/utils';
import OSS from 'ali-oss';
import dayjs from 'dayjs';
export const uploadFile = async (allFiles: FileList | null, aliyunSts: any) => {
  if (allFiles === null || allFiles === undefined || allFiles.length === 0) {
    return;
  }
  // aliyunSts.expiration =
  let tmpAliyunSts = JSON.parse(
    JSON.stringify(useAliyunStsState.getState().aliyunSts),
  );
  if (
    typeof aliyunSts === 'undefined' ||
    aliyunSts.expiration === '' ||
    dayjs(aliyunSts.expiration).isBefore(dayjs())
  ) {
    const { access_key_id, access_key_secret, security_token, expiration } =
      await createAliyunStsToken();
    tmpAliyunSts = {
      accessKeyId: access_key_id,
      accessKeySecret: access_key_secret,
      securityToken: security_token,
      expiration: expiration,
    };

    useAliyunStsState.setState((prev) => {
      return {
        aliyunSts: tmpAliyunSts,
      };
    });
  }

  const firstFile = allFiles[0];
  const client = new OSS({
    // yourRegion填写Bucket所在地域。以华东1（杭州）为例，Region填写为oss-cn-hangzhou。
    region: 'oss-us-west-1',
    // 从STS服务获取的临时访问密钥（AccessKey ID和AccessKey Secret）。
    accessKeyId: tmpAliyunSts.accessKeyId,
    accessKeySecret: tmpAliyunSts.accessKeySecret,
    // 从STS服务获取的安全令牌（SecurityToken）。
    stsToken: tmpAliyunSts.securityToken,

    // refreshSTSToken: async () => {
    //   // 向您搭建的STS服务获取临时访问凭证。
    //   const info = await fetch('your_sts_server');
    //   return {
    //     accessKeyId: info.accessKeyId,
    //     accessKeySecret: info.accessKeySecret,
    //     stsToken: info.stsToken,
    //   };
    // },
    // 刷新临时访问凭证的时间间隔，单位为毫秒。
    refreshSTSTokenInterval: 3000000,
    // 填写Bucket名称。
    bucket: 'ro-scontent',
  });
  // const options: any = {
  //   meta: { temp: 'demo' },
  //   mime: 'json',
  //   headers: { 'Content-Type': 'text/plain' },
  // };
  const name = genUuidv4();
  const srcname = `products/${name}.${firstFile.name.split('.').pop()}`;
  await client.put(srcname, firstFile);
  return `https://ro-scontent.oss-us-west-1.aliyuncs.com/${srcname}`;
};
