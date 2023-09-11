export namespace UserGatewaysTypes {
  export interface IBundleTokens {
    access_token: string;
  }

  export namespace NonAuth {
    export interface IStartForgotPassFlow {
      email: string;
    }

    export interface IEndForgotPassFlow {
      forgot_token: string;
      password: string;
    }

    export interface ICreate {
      name: string;
      email: string;
      password: string;
    }

    export interface ICreateReturn {
      cancelKey: string;
    }
    
    export interface ILaunchOTP {
      email: string;
    }

    export interface ILaunchOTPReturn {
      cancelKey: string;
    }

    export interface ICancel {
      key: string;
      email: string;
    }

    export interface IValidate {
      email: string;
      code: string;
    }

    export interface IThrowTFA {
      email: string;
      password: string;
    }

    export interface ILogin {
      email: string;
      code: string;
    }
  }

  export namespace Auth {
    export interface IDelete {
      access_token: string;
    }

    export interface IUpdateUser {
      name: string;
      description?: string | null;
      image?: {
        file: File;
      };
      access_token: string;
    }
  } 
}

