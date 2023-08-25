type TConstructable = new (...args: any[]) => any;

type IImportableDeps = TImportableFunction | InstanceType<TConstructable>[] | string[]
export type IDependencies = TConstructable[];
export type TImportableFunction = Array<(deps?: IDependencies) => InstanceType<TConstructable>[]>;

interface IProps {
  [key: string]: {
    dependencies?: {
      general?: IDependencies;
      imports?: IImportableDeps;
    }
    instance: TConstructable;
    enabled: boolean;
  }
}

interface IInput {
  [key: string]: {
    dependencies?: {
      general?: IDependencies;
      imports?: IImportableDeps;
    }
    instance: TConstructable;
  }
}

export class RegisterContainer {
  private props: IProps = {};

  constructor(input: IInput) {
    for(let i in input) {
      this.props[i] = {
        dependencies: {
          general: input[i].dependencies?.general ?? [],
          imports: input[i].dependencies?.imports
        },
        instance: input[i].instance,
        enabled: false
      }
    }
  }

  private resolveDependencies(deps: IDependencies | undefined): any[] {
    return deps && deps.length > 0 ? deps?.map((Item) => new Item()) : [];
  };

  private resolveImportableDeps(general: IDependencies, imports: IImportableDeps) {
    const importableDeps = imports.flatMap((item) => {
        if(item instanceof Function)
          return item(general);

        if(typeof item === "string") {
          this.setDependencies(item);
          return new this.props[item].instance(
            ...this.props[item].dependencies?.general ?? []
          );
        }

        return item;
      });

    return importableDeps;
  }

  private setDependencies(key: string) {
    const { dependencies, enabled } = this.props[key];

    if(dependencies && !enabled) {
      const generalDeps = this.resolveDependencies(dependencies.general);
      const importableDeps = this.resolveImportableDeps(
        dependencies.general ?? [], 
        dependencies.imports ?? []
      );

      this.props[key].enabled = true;
      return dependencies.general = [ ...generalDeps, ...importableDeps];
    }
      
    throw Error("Instance already active");
  }

  start<T extends TConstructable>(constructor: T, key: string): InstanceType<T> {
    if(!this.props[key])
      throw new ReferenceError("Nonexistent dependency");
   
    this.setDependencies(key); 

    return new constructor(...this.props[key].dependencies?.general ?? []);
  }
}

