import axios from 'axios';
import { METHOD, UserList, UserResponse, UserAttributes, NodeList, NodeResponse, NodeAttributes, LocationList, LocationResponse, LocationAttributes, ServerList, ServerResponse, ServerAttributes, NestList, NestResponse, NestAttributes, CreateServerPayload, EggList, AllocationList, AllocationResponse, CreateAllocationPayload, IPterodactyl } from '../Types';

/**
 * Pterodactyl API client for interacting with the Pterodactyl panel (v1).
 * @author Seaavey
 */
export default class Pterodactyl implements IPterodactyl {
  public apikey: string;
  public url: string;

  /**
   * Initializes the Pterodactyl API client.
   * @param apikey - The API key for authentication.
   * @param url - The base URL of the Pterodactyl panel.
   * @throws Error if the API key or URL is invalid.
   */
  constructor(apikey: string, url: string) {
    this.apikey = apikey;
    this.url = url;

    if (!this.apikey) throw new Error('API Key is required.');
    if (!this.url) throw new Error('URL is required.');

    if (!this.apikey.startsWith('ptla')) throw new Error('Invalid API Key.');
    if (!this.url.startsWith('https://')) throw new Error('Invalid URL.');
  }

  /**
   * Generates a random ID with a prefix.
   * @param length - Length of the random part (default: 8).
   * @returns The generated ID.
   */
  createId(length: number = 8): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = 'Seaavey-';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length)).toUpperCase();
    }
    return result;
  }

  /**
   * Makes a request to the Pterodactyl API.
   * @param path - The API endpoint path.
   * @param method - The HTTP method (default: GET).
   * @param data - The payload data (default: {}).
   * @returns A promise resolving to the API response or error details.
   */
  async request(path: string, method: METHOD = 'GET', data: any = {}): Promise<any> {
    try {
      const response = await axios({
        method,
        url: this.url + path,
        data,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.apikey}`,
        },
      });
      return response.data;
    } catch (err: any) {
      return err.response?.data?.errors || err;
    }
  }

  /**
   * Retrieves a list of users.
   * @param page - The page number for pagination (default: 1).
   * @returns A promise resolving to a UserList object.
   */
  async getUsers(page: number = 1): Promise<UserList> {
    return this.request(`/api/application/users?page=${page}`);
  }

  /**
   * Retrieves a specific user by ID.
   * @param id - The ID of the user.
   * @returns A promise resolving to a UserResponse object.
   */
  async getUser(id: number): Promise<UserResponse> {
    return this.request(`/api/application/users/${id}`);
  }

  /**
   * Creates a new user with generated credentials.
   * @param number - A unique identifier for the user.
   * @param isAdmin - Whether the user is an admin (default: false).
   * @returns A promise resolving to the created user's credentials and ID.
   */
  async createUser(number: string, isAdmin: boolean = false): Promise<{ username: string; password: string; id: number }> {
    const hostname = new URL(this.url).hostname;
    const parts = hostname.split('.');
    const email = `seaavey-${number}@${parts.slice(-2).join('.')}`;
    const username = `seaavey-${number}`;
    const password = this.createId();

    const response = await this.request('/api/application/users', 'POST', {
      email,
      username,
      first_name: 'Seaavey',
      last_name: 'User',
      language: 'en',
      password,
      root_admin: isAdmin,
    });

    return { username, password, id: response.attributes.id };
  }

  /**
   * Updates an existing user.
   * @param id - The ID of the user.
   * @param data - The user attributes to update.
   * @returns A promise resolving to a UserResponse object.
   */
  async updateUser(id: number, data: Partial<UserAttributes>): Promise<UserResponse> {
    return this.request(`/api/application/users/${id}`, 'PATCH', data);
  }

  /**
   * Deletes a user by ID.
   * @param id - The ID of the user.
   * @returns A promise resolving to the API response.
   */
  async deleteUser(id: number): Promise<any> {
    return this.request(`/api/application/users/${id}`, 'DELETE');
  }

  /**
   * Updates a user's password.
   * @param id - The ID of the user.
   * @param password - The new password.
   * @returns A promise resolving to a UserResponse object.
   */
  async updateUserPassword(id: number, password: string): Promise<UserResponse> {
    const user = await this.getUser(id);
    return this.updateUser(id, {
      email: user.data.attributes.email,
      username: user.data.attributes.username,
      first_name: user.data.attributes.first_name,
      last_name: user.data.attributes.last_name,
      language: user.data.attributes.language,
      password,
    });
  }

  /**
   * Retrieves a list of servers.
   * @param page - The page number for pagination (default: 1).
   * @returns A promise resolving to a ServerList object.
   */
  async getServers(page: number = 1): Promise<ServerList> {
    return this.request(`/api/application/servers?page=${page}`);
  }

  /**
   * Retrieves a specific server by ID.
   * @param id - The ID of the server.
   * @returns A promise resolving to a ServerResponse object.
   */
  async getServer(id: number): Promise<ServerResponse> {
    return this.request(`/api/application/servers/${id}`);
  }

  /**
   * Creates a new server for a user.
   * @param userId - The ID of the user.
   * @param data - The server creation payload.
   * @returns A promise resolving to a ServerResponse object.
   */
  async createServer(userId: number, data: CreateServerPayload): Promise<ServerResponse> {
    const identifier = this.createId(4);
    return this.request('/api/application/servers', 'POST', {
      name: `seaavey-${userId}-${identifier}`,
      description: `Seaavey Server ${identifier}\nCreated on ${this.getDateThirtyDaysLater()}`,
      user: userId,
      egg: data.egg || 15,
      docker_image: data.docker_image || 'william/aio',
      startup: data.startup || 'bash',
      environment: data.environment || {},
      limits: {
        memory: data.memory,
        swap: 0,
        disk: data.disk,
        io: 500,
        cpu: data.cpu,
      },
      feature_limits: {
        databases: 5,
        allocations: 5,
        backups: 5,
      },
      deploy: {
        locations: [1],
        dedicated_ip: false,
        port_range: [],
      },
    });
  }

  /**
   * Updates an existing server.
   * @param id - The ID of the server.
   * @param data - The server attributes to update.
   * @returns A promise resolving to a ServerResponse object.
   */
  async updateServer(id: number, data: Partial<ServerAttributes>): Promise<ServerResponse> {
    return this.request(`/api/application/servers/${id}`, 'PATCH', data);
  }

  /**
   * Deletes a server by ID.
   * @param id - The ID of the server.
   * @returns A promise resolving to the API response.
   */
  async deleteServer(id: number): Promise<any> {
    return this.request(`/api/application/servers/${id}`, 'DELETE');
  }

  /**
   * Suspends a server by ID.
   * @param id - The ID of the server.
   * @returns A promise resolving to the API response.
   */
  async suspendServer(id: number): Promise<any> {
    return this.request(`/api/application/servers/${id}/suspend`, 'POST');
  }

  /**
   * Unsuspends a server by ID.
   * @param id - The ID of the server.
   * @returns A promise resolving to the API response.
   */
  async unsuspendServer(id: number): Promise<any> {
    return this.request(`/api/application/servers/${id}/unsuspend`, 'POST');
  }

  /**
   * Reinstalls a server by ID.
   * @param id - The ID of the server.
   * @returns A promise resolving to the API response.
   */
  async reinstallServer(id: number): Promise<any> {
    return this.request(`/api/application/servers/${id}/reinstall`, 'POST');
  }

  /**
   * Retrieves a list of nodes.
   * @param page - The page number for pagination (default: 1).
   * @returns A promise resolving to a NodeList object.
   */
  async getNodes(page: number = 1): Promise<NodeList> {
    return this.request(`/api/application/nodes?page=${page}`);
  }

  /**
   * Retrieves a specific node by ID.
   * @param id - The ID of the node.
   * @returns A promise resolving to a NodeResponse object.
   */
  async getNode(id: number): Promise<NodeResponse> {
    return this.request(`/api/application/nodes/${id}`);
  }

  /**
   * Creates a new node.
   * @param data - The node attributes for creation.
   * @returns A promise resolving to a NodeResponse object.
   */
  async createNode(data: Partial<NodeAttributes>): Promise<NodeResponse> {
    return this.request('/api/application/nodes', 'POST', data);
  }

  /**
   * Updates an existing node.
   * @param id - The ID of the node.
   * @param data - The node attributes to update.
   * @returns A promise resolving to a NodeResponse object.
   */
  async updateNode(id: number, data: Partial<NodeAttributes>): Promise<NodeResponse> {
    return this.request(`/api/application/nodes/${id}`, 'PATCH', data);
  }

  /**
   * Deletes a node by ID.
   * @param id - The ID of the node.
   * @returns A promise resolving to the API response.
   */
  async deleteNode(id: number): Promise<any> {
    return this.request(`/api/application/nodes/${id}`, 'DELETE');
  }

  /**
   * Retrieves a list of locations.
   * @param page - The page number for pagination (default: 1).
   * @returns A promise resolving to a LocationList object.
   */
  async getLocations(page: number = 1): Promise<LocationList> {
    return this.request(`/api/application/locations?page=${page}`);
  }

  /**
   * Retrieves a specific location by ID.
   * @param id - The ID of the location.
   * @returns A promise resolving to a LocationResponse object.
   */
  async getLocation(id: number): Promise<LocationResponse> {
    return this.request(`/api/application/locations/${id}`);
  }

  /**
   * Creates a new location.
   * @param data - The location attributes for creation.
   * @returns A promise resolving to a LocationResponse object.
   */
  async createLocation(data: Partial<LocationAttributes>): Promise<LocationResponse> {
    return this.request('/api/application/locations', 'POST', data);
  }

  /**
   * Updates an existing location.
   * @param id - The ID of the location.
   * @param data - The location attributes to update.
   * @returns A promise resolving to a LocationResponse object.
   */
  async updateLocation(id: number, data: Partial<LocationAttributes>): Promise<LocationResponse> {
    return this.request(`/api/application/locations/${id}`, 'PATCH', data);
  }

  /**
   * Deletes a location by ID.
   * @param id - The ID of the location.
   * @returns A promise resolving to the API response.
   */
  async deleteLocation(id: number): Promise<any> {
    return this.request(`/api/application/locations/${id}`, 'DELETE');
  }

  /**
   * Retrieves a list of nests.
   * @param page - The page number for pagination (default: 1).
   * @returns A promise resolving to a NestList object.
   */
  async getNests(page: number = 1): Promise<NestList> {
    return this.request(`/api/application/nests?page=${page}`);
  }

  /**
   * Retrieves a specific nest by ID.
   * @param id - The ID of the nest.
   * @returns A promise resolving to a NestResponse object.
   */
  async getNest(id: number): Promise<NestResponse> {
    return this.request(`/api/application/nests/${id}`);
  }

  /**
   * Retrieves eggs from a specific nest.
   * @param nestId - The ID of the nest.
   * @returns A promise resolving to an EggList object.
   */
  async getEggsFromNest(nestId: number): Promise<EggList> {
    return this.request(`/api/application/nests/${nestId}/eggs`);
  }

  /**
   * Retrieves a list of allocations.
   * @param page - The page number for pagination (default: 1).
   * @returns A promise resolving to an AllocationList object.
   */
  async getAllocations(page: number = 1): Promise<AllocationList> {
    return this.request(`/api/application/allocations?page=${page}`);
  }

  /**
   * Retrieves a specific allocation by ID.
   * @param id - The ID of the allocation.
   * @returns A promise resolving to an AllocationResponse object.
   */
  async getAllocation(id: number): Promise<AllocationResponse> {
    return this.request(`/api/application/allocations/${id}`);
  }

  /**
   * Creates a new allocation for a server.
   * @param serverId - The ID of the server.
   * @param data - The allocation creation payload.
   * @returns A promise resolving to an AllocationResponse object.
   */
  async createAllocation(serverId: number, data: CreateAllocationPayload): Promise<AllocationResponse> {
    return this.request(`/api/application/servers/${serverId}/allocations`, 'POST', data);
  }

  /**
   * Deletes an allocation by ID.
   * @param id - The ID of the allocation.
   * @returns A promise resolving to the API response.
   */
  async deleteAllocation(id: number): Promise<any> {
    return this.request(`/api/application/allocations/${id}`, 'DELETE');
  }

  /**
   * Returns the date 30 days from now in a formatted string.
   * @returns The formatted date string.
   */
  private getDateThirtyDaysLater(): string {
    const date = new Date();
    date.setDate(date.getDate() + 30);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  }
}
