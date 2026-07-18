/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getAdmin = /* GraphQL */ `query GetAdmin($id: ID!) {
  getAdmin(id: $id) {
    address
    buildingCode
    buildingName
    buildingNo
    createdAt
    email
    id
    managerCode
    managerName
    phoneNo
    updatedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetAdminQueryVariables, APITypes.GetAdminQuery>;
export const getBuilding = /* GraphQL */ `query GetBuilding($id: ID!) {
  getBuilding(id: $id) {
    address
    buildingCode
    buildingName
    buildingNo
    createdAt
    id
    location
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetBuildingQueryVariables,
  APITypes.GetBuildingQuery
>;
export const getParking = /* GraphQL */ `query GetParking($id: ID!) {
  getParking(id: $id) {
    buildingCode
    buildingName
    buildingNo
    createdAt
    description
    id
    parkingLots
    parkingName
    parkingNo
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetParkingQueryVariables,
  APITypes.GetParkingQuery
>;
export const getReserving = /* GraphQL */ `query GetReserving($id: ID!) {
  getReserving(id: $id) {
    accessNo
    createdAt
    dateTime
    duration
    email
    id
    parkingNo
    phone
    updatedAt
    vehicleCode
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetReservingQueryVariables,
  APITypes.GetReservingQuery
>;
export const getUnitInfo = /* GraphQL */ `query GetUnitInfo($id: ID!) {
  getUnitInfo(id: $id) {
    accessNo
    buildingCode
    createdAt
    email
    id
    phone
    sakenLastName
    sakenName
    unitNo
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetUnitInfoQueryVariables,
  APITypes.GetUnitInfoQuery
>;
export const listAdmins = /* GraphQL */ `query ListAdmins(
  $filter: ModelAdminFilterInput
  $limit: Int
  $nextToken: String
) {
  listAdmins(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      address
      buildingCode
      buildingName
      buildingNo
      createdAt
      email
      id
      managerCode
      managerName
      phoneNo
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListAdminsQueryVariables,
  APITypes.ListAdminsQuery
>;
export const listBuildings = /* GraphQL */ `query ListBuildings(
  $filter: ModelBuildingFilterInput
  $limit: Int
  $nextToken: String
) {
  listBuildings(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      address
      buildingCode
      buildingName
      buildingNo
      createdAt
      id
      location
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListBuildingsQueryVariables,
  APITypes.ListBuildingsQuery
>;
export const listParkings = /* GraphQL */ `query ListParkings(
  $filter: ModelParkingFilterInput
  $limit: Int
  $nextToken: String
) {
  listParkings(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      buildingCode
      buildingName
      buildingNo
      createdAt
      description
      id
      parkingLots
      parkingName
      parkingNo
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListParkingsQueryVariables,
  APITypes.ListParkingsQuery
>;
export const listReservings = /* GraphQL */ `query ListReservings(
  $filter: ModelReservingFilterInput
  $limit: Int
  $nextToken: String
) {
  listReservings(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      accessNo
      createdAt
      dateTime
      duration
      email
      id
      parkingNo
      phone
      updatedAt
      vehicleCode
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListReservingsQueryVariables,
  APITypes.ListReservingsQuery
>;
export const listUnitInfos = /* GraphQL */ `query ListUnitInfos(
  $filter: ModelUnitInfoFilterInput
  $limit: Int
  $nextToken: String
) {
  listUnitInfos(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      accessNo
      buildingCode
      createdAt
      email
      id
      phone
      sakenLastName
      sakenName
      unitNo
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListUnitInfosQueryVariables,
  APITypes.ListUnitInfosQuery
>;
