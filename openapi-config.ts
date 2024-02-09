import type { ConfigFile } from '@rtk-query/codegen-openapi'

const config: ConfigFile = {
  schemaFile: 'openAPI.json',
  apiFile: './src/redux/emptyApi.ts',
  apiImport: 'emptySplitApi',
  outputFile: './src/redux/doctorApi.ts',
  exportName: 'doctorApi',
  hooks: true,
}

export default config