import z from 'zod';

export const scheduleScanSettingSchema = z.object({
  frequency: z.string(),
  date: z.string(),
  weekday: z.string(),
  hour: z.string(),
  minute: z.string(),
});

export const cloudFormSchema = z.object({
  id: z.string(),
  name: z.string().min(1, { message: '이름을 입력해주세요.' }),
  credentialType: z.string(),
  provider: z.string(),
  accessKey: z.string(),
  secretAccessKey: z.string(),
  region: z.string(),
  proxyUrl: z.string(),
  scheduleScanEnabled: z.boolean().optional(),
  scheduleScanSetting: scheduleScanSettingSchema,
  cloudTrailName: z.string(),
});

export type CloudFormValues = z.infer<typeof cloudFormSchema>;
