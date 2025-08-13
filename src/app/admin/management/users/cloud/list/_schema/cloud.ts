import z from 'zod';
import { CREDENTIAL_FIELD_CONFIGS } from '@Constants/credential-fields';

export const scheduleScanSettingSchema = z.object({
  frequency: z.string(),
  date: z.string(),
  weekday: z.string(),
  hour: z.string(),
  minute: z.string(),
});

const baseCloudFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: '필수 입력 필드입니다.' }),
  credentialType: z.string(),
  provider: z.string(),
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

const allCredentialFields = z.object({
  // AWS fields
  accessKey: z.string().optional(),
  secretAccessKey: z.string().optional(),
  roleArn: z.string().optional(),
  // Azure fields
  tenantId: z.string().optional(),
  subscriptionId: z.string().optional(),
  applicationId: z.string().optional(),
  secretKey: z.string().optional(),
  // GCP fields
  projectId: z.string().optional(),
  jsonText: z.string().optional(),
});

export const cloudFormSchema = baseCloudFormSchema.merge(allCredentialFields);

export type CloudFormValues = z.infer<typeof cloudFormSchema>;

export const getDynamicCloudFormSchema = (provider: string, credentialType: string) => {
  const providerConfig = CREDENTIAL_FIELD_CONFIGS[provider];
  if (!providerConfig) {
    return cloudFormSchema;
  }

  const fields = providerConfig.fields[credentialType];
  if (!fields) {
    return cloudFormSchema;
  }

  const credentialValidation: Record<string, z.ZodString | z.ZodOptional<z.ZodString>> = {};

  fields.forEach(field => {
    if (field.required) {
      credentialValidation[field.name] = z.string().min(1, { message: '필수 입력 필드입니다.' });
    } else {
      credentialValidation[field.name] = z.string().optional();
    }
  });

  return baseCloudFormSchema.merge(z.object(credentialValidation));
};
