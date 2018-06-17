const PARAM_MISSING_ERROR = (functionName: string) =>
  `${functionName} was called with no parameter! ${functionName}() needs to be called with params. call as following: ${functionName}("someParameters") . `;

export const defIndexPathHelper = (resource: string, helperObject: object) => {
  helperObject[`${resource}IndexPath`] = () => `/${resource}`;
};

export const defShowPathHelper = (resource: string, helperObject: object) => {
  helperObject[`${resource}ShowPath`] = (param: string) => {
    if (param) {
      return `/${resource}/${param}`;
    }

    throw new Error(PARAM_MISSING_ERROR(`${resource}ShowPath`));
  };
};

export const defNewPathHelper = (resource: string, helperObject: object) => {
  helperObject[`${resource}NewPath`] = () => `/${resource}/new`;
};

export const defEditPathHelper = (resource: string, helperObject: object) => {
  helperObject[`${resource}EditPath`] = (param: string) => {
    if (param) {
      return `/${resource}/${param}/edit`;
    }
    throw new Error(PARAM_MISSING_ERROR(`${resource}EditPath`));
  };
};

export const defCreatePathHelper = (resource: string, helperObject: object) => {
  helperObject[`${resource}CreatePath`] = () => `/${resource}`;
};

export const defUpdatePathHelper = (resource: string, helperObject: object) => {
  helperObject[`${resource}UpdatePath`] = (param: string) => {
    if (param) {
      return `/${resource}/${param}`;
    }
    throw new Error(PARAM_MISSING_ERROR(`${resource}UpdatePath`));
  };
};

export const defDestroyPathHelper = (
  resource: string,
  helperObject: object
) => {
  helperObject[`${resource}DestroyPath`] = (param: string) => {
    if (param) {
      return `/${resource}/${param}`;
    }
    throw new Error(PARAM_MISSING_ERROR(`${resource}DestroyPath`));
  };
};
