export const storageIds = {
  cache: {
    manager: Symbol.for("CacheManager"),
    tokenEntitie: Symbol.for("TokensCacheRepo"),
    adminEntitie: Symbol.for("AdminsCacheRepo")
  },
  db: {
    manager: Symbol.for("DatabaseManager"),
    adminEntitie: Symbol.for("AdminsRepo")
  },
  external: {
    postRepo: Symbol.for("PostRepo")
  },
  search: {
    manager: Symbol.for("SearchManager")
  }
}
