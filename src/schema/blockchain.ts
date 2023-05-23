type BlockChainType = {
	Code: string
	ExtendValue: string
	Name: string
}

type GenreType = {
	Code: string
	Name: string
}

type PlatformType = {
	Code: string
	Name: string
}

export type BlockChainSchema = {
	BlockChains: BlockChainType[]
	Code: string
	Genres: GenreType[]
	ImageUrl: string
	Name: string
	Price: number | string
	Symbol: string
	Platforms: PlatformType[]
}
