import { Application } from "@/@core/application/container";
import { Header } from "@/components/common/Header";
import { NotificationBalloon } from "@/components/common/NotificationBalloon";
import { DeleteModal } from "@/components/config/DeleteModal";
import { EditingMode } from "@/components/config/EditingMode";
import { VisualizationMode } from "@/components/config/VisualizationMode";
import { CHANGE_AUTH_TOKEN, IUserContainerData } from "@/features/auth/auth.slice";

import {
	GetServerSidePropsContext,
	InferGetServerSidePropsType,
} from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { refreshAllTokens } from "./api/serverFunctions/refreshAllTokens";

export interface IUserProfileData {
  name: string;
  imageURL: string | null;
  description: string | null;
  file?: File | null;
}

export interface IDisponibleStages {
  isEditing: boolean;
  isDeleting: boolean;
}

export default function Config({ 
	rawToken,
	userContainerData 
}: InferGetServerSidePropsType<
  typeof getServerSideProps
>) {
	const dispatch = useDispatch();
	const [error, setError] = useState<boolean>(false);
	const [stages, setStages] = useState<IDisponibleStages>({
		isEditing: false,
		isDeleting: false,
	});

	const [ staticUserData, setStaticUserData ] = useState<IUserProfileData>({
		name: userContainerData.userData.name,
		imageURL: userContainerData.userData.imageUrl,
		description: userContainerData.userData.description
	});

	useEffect(() => {
		dispatch(CHANGE_AUTH_TOKEN({
			rawToken,
			userContainerData 
		}));

		const eventId = setInterval(async () => {
			const { access_token } = await Application
				.refreshTokensFlow
				.refresh
				.exec();

			const user: IUserContainerData = JSON.parse(
				Buffer.from(
					access_token.split(".")[1], 
					"base64"
				).toString("ascii")
			);

			setStaticUserData({
				name: user.userData.name,
				imageURL: user.userData.imageUrl,
				description: user.userData.description,
			});

			dispatch(CHANGE_AUTH_TOKEN({
				rawToken: `Bearer ${access_token}`,
				userContainerData: user
			}));
		}, 1000 * 60 * 14);

		return () => {
			clearInterval(eventId);
		};
	});

	return (
		<>
			<Head>
				<title>ConSciência - configurações</title>
				<meta
					name="description"
					content="Configure o seu perfil da maneira que mais te agrada e aproveite o nosso blog."
				/>
			</Head>
			<div id="content" className="grid">
				<Header />
				<main className='grid min-h-[30rem] my-16'>
					<NotificationBalloon
						activate={error}
						setActivate={setError}
						title='ERRO:'
						text='Erro ao enviar os dados'
						type='error'
						className='mt-20 z-[2]'
					/>
					<div className='grid w-full'>
						{
							stages.isEditing && !stages.isDeleting
								? <EditingMode
									staticUserData={staticUserData}
									setStaticUserData={setStaticUserData}
									setStages={setStages}
									error={error}
									setError={setError}
								/>
								: !stages.isEditing && !stages.isDeleting 
									? <VisualizationMode
										staticUserData={staticUserData}
										setStages={setStages}
									/>
									: <DeleteModal 
										setError={setError}
										setStages={setStages}
									/>
						} 
					</div>
				</main>
			</div>
		</>
	);
}

export async function getServerSideProps(
	ctx: GetServerSidePropsContext
) {
	try {
		const { rawToken, userData } = await refreshAllTokens(ctx);	

		return {
			props: {
				userContainerData: userData,
				rawToken
			},
		};
	} catch (err) {
		return {
			redirect: {
				permanent: false,
				destination: "/login"
			}
		};
	}
}
