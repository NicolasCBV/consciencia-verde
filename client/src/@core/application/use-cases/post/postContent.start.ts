import { Container } from "inversify";
import { useCasesIds } from "../useCasesId";
import { CreatePostUseCase } from "./create/create.use-case";
import { ExistPostUseCase } from "./exist/exist.use-case";
import { GetPostUseCase } from "./get/get.use-case";
import { PaginationPostUseCase } from "./get/pagination.use-case";
import { SearchPostUseCase } from "./search/search.use-case";

export function startPostContent(container: Container) {
  container.bind(useCasesIds.post.create).to(CreatePostUseCase);
  container.bind(useCasesIds.post.get).to(GetPostUseCase);
  container.bind(useCasesIds.post.pagination).to(PaginationPostUseCase);
  container.bind(useCasesIds.post.exist).to(ExistPostUseCase);
  container.bind(useCasesIds.post.search).to(SearchPostUseCase);
}
