declare const Verifier: {
    verifyConfig: (input: any, verifyConfigs: any, immediately?: boolean) => any[];
    verify: (verifierName: any, value: any, verifierValue: any) => any;
};
export default Verifier;
