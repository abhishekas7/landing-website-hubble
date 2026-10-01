
import { ReactNode } from "react";

export interface Product {
  id: number;
  name: string;
  description: string;
  image: ReactNode;

  overview: string;

  features: string[];

  benefits: string[];

  useCases: string[];

  specifications: {
    label: string;
    value: string;
  }[];
}

export interface iotModuleProductTypes {
    id: number;
    name: string;
    subtitle: string;
    desc: string;
    imageLink: string;
    detailsView: IotModuleDetailsView;
}

export interface IotModuleDetailsView {
    title: string;
    des: string;
    whatIs: string;
    chip: IotModuleChip[];
}

export interface IotModuleChip {
    name: string;
    imgUrl: string;
    types: string[];

    cellularBands: {
        [region: string]:
            | string
            | {
                  LTE?: string;
                  NR?: string;
                  NTN?: string;
              };
    };

    os: string;

    interfaces: string[];

    speeds: {
        [technology: string]: {
            download: string;
            upload: string;
        };
    };

    keyHighlights: string[];
}