export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    DateTime: any;
};

export type Attraction = {
    __typename?: 'Attraction';
    address: Scalars['String'];
    awards?: Maybe<Array<Scalars['String']>>;
    description?: Maybe<Scalars['String']>;
    id: Scalars['ID'];
    image: Scalars['String'];
    name: Scalars['String'];
    priceRange?: Maybe<Scalars['String']>;
    ranking: Scalars['String'];
    rating?: Maybe<Scalars['Float']>;
    reactions?: Maybe<Array<Reaction>>;
    reviewCount?: Maybe<Scalars['Int']>;
    subcategories?: Maybe<Array<Scalars['String']>>;
    trip: Trip;
    tripadvisorLink?: Maybe<Scalars['String']>;
    website?: Maybe<Scalars['String']>;
};

export type Comment = {
    __typename?: 'Comment';
    author: User;
    createdAt: Scalars['DateTime'];
    id: Scalars['ID'];
    text: Scalars['String'];
    trip: Trip;
    updatedAt: Scalars['DateTime'];
};

export type CreateCommentInput = {
    text: Scalars['String'];
    tripId: Scalars['ID'];
};

export type CreateEntity = {
    __typename?: 'CreateEntity';
    id: Scalars['ID'];
    success: Scalars['Boolean'];
};

export type CreateExperienceInput = {
    address: Scalars['String'];
    awards?: InputMaybe<Array<Scalars['String']>>;
    cuisine?: InputMaybe<Array<Scalars['String']>>;
    description?: InputMaybe<Scalars['String']>;
    image: Scalars['String'];
    name: Scalars['String'];
    priceRange?: InputMaybe<Scalars['String']>;
    ranking: Scalars['String'];
    rating?: InputMaybe<Scalars['Float']>;
    reviewCount?: InputMaybe<Scalars['Int']>;
    subcategories?: InputMaybe<Array<Scalars['String']>>;
    tripId: Scalars['ID'];
    tripadvisorLink?: InputMaybe<Scalars['String']>;
    website?: InputMaybe<Scalars['String']>;
};

export type CreateTempUserInput = {
    email: Scalars['String'];
    name: Scalars['String'];
    tripId: Scalars['ID'];
    type?: InputMaybe<UserType>;
};

export type CreateTripInput = {
    departureDate: Scalars['DateTime'];
    destination: Scalars['String'];
    invitees?: InputMaybe<Array<Scalars['String']>>;
    returnDate: Scalars['DateTime'];
};

export type DeleteEntityResult = {
    __typename?: 'DeleteEntityResult';
    message: Scalars['String'];
    success: Scalars['Boolean'];
};

export type Experience = {
    __typename?: 'Experience';
    address: Scalars['String'];
    description?: Maybe<Scalars['String']>;
    id: Scalars['ID'];
    image: Scalars['String'];
    name: Scalars['String'];
    priceRange?: Maybe<Scalars['String']>;
    ranking: Scalars['String'];
    rating?: Maybe<Scalars['Float']>;
    reviewCount?: Maybe<Scalars['Int']>;
    trip: Trip;
    tripadvisorLink?: Maybe<Scalars['String']>;
    website?: Maybe<Scalars['String']>;
};

export type GetAttractionResult = Attraction | ResolverError;

export type GetHotelResult = Hotel | ResolverError;

export type GetReactionResult = Reaction | ResolverError;

export type GetRestaurantResult = ResolverError | Restaurant;

export type GetUserInput = {
    email?: InputMaybe<Scalars['String']>;
    tripId: Scalars['ID'];
    userId: Scalars['ID'];
};

export type GetUserResult = ResolverError | User;

export type Hotel = {
    __typename?: 'Hotel';
    address: Scalars['String'];
    description?: Maybe<Scalars['String']>;
    id: Scalars['ID'];
    image: Scalars['String'];
    name: Scalars['String'];
    priceRange?: Maybe<Scalars['String']>;
    ranking: Scalars['String'];
    rating?: Maybe<Scalars['Float']>;
    reactions?: Maybe<Array<Reaction>>;
    reviewCount?: Maybe<Scalars['Int']>;
    trip: Trip;
    tripadvisorLink?: Maybe<Scalars['String']>;
    website?: Maybe<Scalars['String']>;
};

export type LoginResult = LoginSuccess | ResolverError;

export type LoginSuccess = {
    __typename?: 'LoginSuccess';
    accessToken: Scalars['String'];
};

export type Mutation = {
    __typename?: 'Mutation';
    addAttraction: CreateEntity;
    addComment: CreateEntity;
    addHotel: CreateEntity;
    addReaction: CreateEntity;
    addRestaurant: CreateEntity;
    createTempUser: RegisterResult;
    createTrip: CreateEntity;
    deleteAttraction: DeleteEntityResult;
    deleteComment: DeleteEntityResult;
    deleteHotel: DeleteEntityResult;
    deleteReaction: DeleteEntityResult;
    deleteRestaurant: DeleteEntityResult;
    deleteTrip: DeleteEntityResult;
    loginUser: LoginResult;
    registerUser: RegisterResult;
    updateComment: UpdateEntityResult;
    updateTrip: UpdateEntityResult;
};

export type MutationAddAttractionArgs = {
    input: CreateExperienceInput;
    invitedUserEmail?: InputMaybe<Scalars['String']>;
};

export type MutationAddCommentArgs = {
    input: CreateCommentInput;
    invitedUserEmail?: InputMaybe<Scalars['String']>;
};

export type MutationAddHotelArgs = {
    input: CreateExperienceInput;
    invitedUserEmail?: InputMaybe<Scalars['String']>;
};

export type MutationAddReactionArgs = {
    experienceId: Scalars['String'];
    tripId: Scalars['String'];
    type: Scalars['String'];
};

export type MutationAddRestaurantArgs = {
    input: CreateExperienceInput;
    invitedUserEmail?: InputMaybe<Scalars['String']>;
};

export type MutationCreateTempUserArgs = {
    input: CreateTempUserInput;
};

export type MutationCreateTripArgs = {
    input: CreateTripInput;
};

export type MutationDeleteAttractionArgs = {
    id: Scalars['String'];
    type?: InputMaybe<Scalars['String']>;
};

export type MutationDeleteCommentArgs = {
    id: Scalars['String'];
    type?: InputMaybe<Scalars['String']>;
};

export type MutationDeleteHotelArgs = {
    id: Scalars['String'];
    type?: InputMaybe<Scalars['String']>;
};

export type MutationDeleteReactionArgs = {
    id: Scalars['String'];
    type?: InputMaybe<Scalars['String']>;
};

export type MutationDeleteRestaurantArgs = {
    id: Scalars['String'];
    type?: InputMaybe<Scalars['String']>;
};

export type MutationDeleteTripArgs = {
    tripId: Scalars['String'];
    type?: InputMaybe<Scalars['String']>;
};

export type MutationLoginUserArgs = {
    email: Scalars['String'];
    password: Scalars['String'];
};

export type MutationRegisterUserArgs = {
    input: RegisterUserInput;
};

export type MutationUpdateCommentArgs = {
    id: Scalars['String'];
    text: Scalars['String'];
    type?: InputMaybe<Scalars['String']>;
};

export type MutationUpdateTripArgs = {
    input: UpdateTripInput;
    tripId: Scalars['String'];
};

export type Query = {
    __typename?: 'Query';
    getAttraction: GetAttractionResult;
    getCurrentUser: User;
    getHotel: GetHotelResult;
    getReaction: GetReactionResult;
    getRestaurant: GetRestaurantResult;
    getTrip: Trip;
    getUser: GetUserResult;
};

export type QueryGetAttractionArgs = {
    attractionId: Scalars['String'];
    invitedUserEmail?: InputMaybe<Scalars['String']>;
    tripId: Scalars['String'];
};

export type QueryGetHotelArgs = {
    hotelId: Scalars['String'];
    invitedUserEmail?: InputMaybe<Scalars['String']>;
    tripId: Scalars['String'];
};

export type QueryGetReactionArgs = {
    id: Scalars['String'];
    invitedUserEmail?: InputMaybe<Scalars['String']>;
};

export type QueryGetRestaurantArgs = {
    id: Scalars['String'];
    invitedUserEmail?: InputMaybe<Scalars['String']>;
    tripId: Scalars['String'];
};

export type QueryGetTripArgs = {
    invitedUserEmail?: InputMaybe<Scalars['String']>;
    tripId: Scalars['String'];
};

export type QueryGetUserArgs = {
    input: GetUserInput;
};

export type Reaction = {
    __typename?: 'Reaction';
    attraction?: Maybe<Attraction>;
    createdAt: Scalars['DateTime'];
    hotel?: Maybe<Hotel>;
    id: Scalars['ID'];
    like?: Maybe<Scalars['Boolean']>;
    restaurant?: Maybe<Restaurant>;
    user: User;
};

export type RegisterResult = {
    __typename?: 'RegisterResult';
    message: Scalars['String'];
    success: Scalars['Boolean'];
};

export type RegisterUserInput = {
    email: Scalars['String'];
    name: Scalars['String'];
    password: Scalars['String'];
};

export type ResolverError = {
    __typename?: 'ResolverError';
    message: Scalars['String'];
    success?: Maybe<Scalars['Boolean']>;
};

export type ResolverSuccess = {
    __typename?: 'ResolverSuccess';
    message: Scalars['String'];
    success: Scalars['Boolean'];
};

export type Restaurant = {
    __typename?: 'Restaurant';
    address: Scalars['String'];
    cuisine?: Maybe<Array<Scalars['String']>>;
    description?: Maybe<Scalars['String']>;
    id: Scalars['ID'];
    image: Scalars['String'];
    name: Scalars['String'];
    priceRange?: Maybe<Scalars['String']>;
    ranking: Scalars['String'];
    rating?: Maybe<Scalars['Float']>;
    reactions?: Maybe<Array<Reaction>>;
    reviewCount?: Maybe<Scalars['Int']>;
    trip: Trip;
    tripadvisorLink?: Maybe<Scalars['String']>;
    website?: Maybe<Scalars['String']>;
};

export type Trip = {
    __typename?: 'Trip';
    attractions: Array<Attraction>;
    comments: Array<Comment>;
    createdAt: Scalars['DateTime'];
    creator: User;
    departureDate: Scalars['DateTime'];
    destination: Scalars['String'];
    hotels: Array<Hotel>;
    id: Scalars['ID'];
    /** A list of emails that the creator has invited to join the trip */
    invitees?: Maybe<Array<Scalars['String']>>;
    participants?: Maybe<Array<Scalars['String']>>;
    restaurants: Array<Restaurant>;
    returnDate: Scalars['DateTime'];
    updatedAt: Scalars['DateTime'];
};

export type UpdateEntityResult = ResolverError | ResolverSuccess;

export type UpdateTripInput = {
    departureDate?: InputMaybe<Scalars['DateTime']>;
    destination?: InputMaybe<Scalars['String']>;
    invitees?: InputMaybe<Array<Scalars['String']>>;
    returnDate?: InputMaybe<Scalars['DateTime']>;
};

export type User = {
    __typename?: 'User';
    comments?: Maybe<Array<Comment>>;
    createdAt: Scalars['DateTime'];
    createdTrips?: Maybe<Trip>;
    email: Scalars['String'];
    id: Scalars['ID'];
    joinedTrips?: Maybe<Array<Scalars['String']>>;
    name: Scalars['String'];
    reactions?: Maybe<Array<Reaction>>;
    type?: Maybe<UserType>;
};

export enum UserType {
    Registered = 'Registered',
    Temp = 'Temp'
}
