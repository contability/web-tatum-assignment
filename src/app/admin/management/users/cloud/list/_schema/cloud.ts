import z from 'zod';

export const scheduleScanSettingSchema = z.object({
  frequency: z.string(),
  date: z.string(),
  weekday: z.string(),
  hour: z.string(),
  minute: z.string(),
});

export const cloudFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: '필수 입력 필드입니다.' }),
  credentialType: z.string(),
  provider: z.string(),
  accessKey: z.string().min(1, { message: '필수 입력 필드입니다.' }),
  secretAccessKey: z.string().min(1, { message: '필수 입력 필드입니다.' }),
  region: z.string(),
  proxyUrl: z.string(),
  scheduleScanEnabled: z.string(),
  frequency: z.string(),
  date: z.string(),
  weekday: z.string(),
  hour: z.string(),
  minute: z.string(),
  cloudTrailName: z.string(),
});

export type CloudFormValues = z.infer<typeof cloudFormSchema>;
