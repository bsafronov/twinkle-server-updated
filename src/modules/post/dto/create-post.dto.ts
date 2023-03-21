export interface CreatePostDTO {
  owner_id: string;
  wall_id: string;
  content: PostContentProps[];
}

export interface CreatePostBodyProps {
  wall_id: string;
  content: PostContentProps[];
}

export interface PostContentProps {
  type: string;
  desc: string;
}
