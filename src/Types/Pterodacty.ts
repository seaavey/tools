/**
 * Interface defining the contract for the Pterodactyl API client.
 */

export interface IPterodactyl {
  apikey: string;
  url: string;
  createId(length?: number): string;
  request(path: string, method?: METHOD, data?: any): Promise<any>;
  getUsers(page?: number): Promise<UserList>;
  getUser(id: number): Promise<UserResponse>;
  createUser(number: string, isAdmin?: boolean): Promise<{ username: string; password: string; id: number }>;
  updateUser(id: number, data: Partial<UserAttributes>): Promise<UserResponse>;
  deleteUser(id: number): Promise<any>;
  updateUserPassword(id: number, password: string): Promise<UserResponse>;
  getServers(page?: number): Promise<ServerList>;
  getServer(id: number): Promise<ServerResponse>;
  createServer(userId: number, data: CreateServerPayload): Promise<ServerResponse>;
  updateServer(id: number, data: Partial<ServerAttributes>): Promise<ServerResponse>;
  deleteServer(id: number): Promise<any>;
  suspendServer(id: number): Promise<any>;
  unsuspendServer(id: number): Promise<any>;
  reinstallServer(id: number): Promise<any>;
  getNodes(page?: number): Promise<NodeList>;
  getNode(id: number): Promise<NodeResponse>;
  createNode(data: Partial<NodeAttributes>): Promise<NodeResponse>;
  updateNode(id: number, data: Partial<NodeAttributes>): Promise<NodeResponse>;
  deleteNode(id: number): Promise<any>;
  getLocations(page?: number): Promise<LocationList>;
  getLocation(id: number): Promise<LocationResponse>;
  createLocation(data: Partial<LocationAttributes>): Promise<LocationResponse>;
  updateLocation(id: number, data: Partial<LocationAttributes>): Promise<LocationResponse>;
  deleteLocation(id: number): Promise<any>;
  getNests(page?: number): Promise<NestList>;
  getNest(id: number): Promise<NestResponse>;
  getEggsFromNest(nestId: number): Promise<EggList>;
  getAllocations(page?: number): Promise<AllocationList>;
  getAllocation(id: number): Promise<AllocationResponse>;
  createAllocation(serverId: number, data: CreateAllocationPayload): Promise<AllocationResponse>;
  deleteAllocation(id: number): Promise<any>;
}

/**
 * Enum for HTTP methods.
 */
export enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
  PUT = 'PUT',
}

/**
 * Interface for pagination metadata.
 */
export interface Pagination {
  total: number;
  count: number;
  per_page: number;
  current_page: number;
  total_pages: number;
  links: Links;
}

/**
 * Interface for pagination links.
 */
export interface Links {
  [key: string]: string | undefined;
}

/**
 * Interface for response metadata.
 */
export interface Meta {
  pagination: Pagination;
}

/**
 * Interface for a list of users.
 */
export interface UserList {
  object: string;
  data: User[];
  meta: Meta;
}

/**
 * Interface for a single user response.
 */
export interface UserResponse {
  object: string;
  data: User;
}

/**
 * Interface for a user object.
 */
export interface User {
  object: string;
  attributes: UserAttributes;
}

/**
 * Interface for user attributes.
 */
export interface UserAttributes {
  id: number;
  external_id?: string;
  uuid: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  language: string;
  root_admin: boolean;
  two_factor_enabled: boolean;
  created_at: string;
  updated_at: string;
  password?: string;
}

/**
 * Interface for a list of nodes.
 */
export interface NodeList {
  object: string;
  data: Node[];
  meta: Meta;
}

/**
 * Interface for a single node response.
 */
export interface NodeResponse {
  object: string;
  data: Node;
}

/**
 * Interface for a node object.
 */
export interface Node {
  object: string;
  attributes: NodeAttributes;
}

/**
 * Interface for node attributes.
 */
export interface NodeAttributes {
  id: number;
  uuid: string;
  public: boolean;
  name: string;
  description: string;
  location_id: number;
  fqdn: string;
  scheme: string;
  behind_proxy: boolean;
  maintenance_mode: boolean;
  memory: number;
  memory_overallocate: number;
  disk: number;
  disk_overallocate: number;
  upload_size: number;
  daemon_listen: number;
  daemon_sftp: number;
  daemon_base: string;
  created_at: string;
  updated_at: string;
}

/**
 * Interface for a list of locations.
 */
export interface LocationList {
  object: string;
  data: Location[];
  meta: Meta;
}

/**
 * Interface for a single location response.
 */
export interface LocationResponse {
  object: string;
  data: Location;
}

/**
 * Interface for a location object.
 */
export interface Location {
  object: string;
  attributes: LocationAttributes;
}

/**
 * Interface for location attributes.
 */
export interface LocationAttributes {
  id: number;
  short: string;
  long: string;
  created_at: string;
  updated_at: string;
}

/**
 * Interface for a list of servers.
 */
export interface ServerList {
  object: string;
  data: Server[];
  meta: Meta;
}

/**
 * Interface for a single server response.
 */
export interface ServerResponse {
  object: string;
  data: Server;
}

/**
 * Interface for a server object.
 */
export interface Server {
  object: string;
  attributes: ServerAttributes;
}

/**
 * Interface for server attributes.
 */
export interface ServerAttributes {
  id: number;
  external_id?: string;
  uuid: string;
  identifier: string;
  name: string;
  description: string;
  suspended: boolean;
  limits: ServerLimits;
  feature_limits: ServerFeatureLimits;
  user: number;
  node: number;
  allocation: number;
  nest: number;
  egg: number;
  created_at: string;
  updated_at: string;
}

/**
 * Interface for server resource limits.
 */
export interface ServerLimits {
  memory: number;
  swap: number;
  disk: number;
  io: number;
  cpu: number;
}

/**
 * Interface for server feature limits.
 */
export interface ServerFeatureLimits {
  databases: number;
  allocations: number;
  backups: number;
}

/**
 * Interface for a list of nests.
 */
export interface NestList {
  object: string;
  data: Nest[];
  meta: Meta;
}

/**
 * Interface for a single nest response.
 */
export interface NestResponse {
  object: string;
  data: Nest;
}

/**
 * Interface for a nest object.
 */
export interface Nest {
  object: string;
  attributes: NestAttributes;
}

/**
 * Interface for nest attributes.
 */
export interface NestAttributes {
  id: number;
  uuid: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

/**
 * Interface for server creation payload.
 */
export interface CreateServerPayload {
  egg?: number;
  docker_image?: string;
  startup?: string;
  environment?: Record<string, any>;
  memory: number;
  disk: number;
  cpu: number;
}

/**
 * Interface for allocation creation payload.
 */
export interface CreateAllocationPayload {
  ip: string;
  ports: string[];
}

/**
 * Interface for a list of eggs.
 */
export interface EggList {
  object: string;
  data: Egg[];
}

/**
 * Interface for an egg object.
 */
export interface Egg {
  object: string;
  attributes: EggAttributes;
}

/**
 * Interface for egg attributes.
 */
export interface EggAttributes {
  id: number;
  uuid: string;
  nest: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

/**
 * Interface for a list of allocations.
 */
export interface AllocationList {
  object: string;
  data: Allocation[];
  meta: Meta;
}

/**
 * Interface for a single allocation response.
 */
export interface AllocationResponse {
  object: string;
  data: Allocation;
}

/**
 * Interface for an allocation object.
 */
export interface Allocation {
  object: string;
  attributes: AllocationAttributes;
}

/**
 * Interface for allocation attributes.
 */
export interface AllocationAttributes {
  id: number;
  node: number;
  ip: string;
  ip_alias: string | null;
  port: number;
  assigned: boolean;
  created_at: string;
  updated_at: string;
}
