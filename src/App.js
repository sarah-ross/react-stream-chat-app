import React, { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import {
	Chat,
	Channel,
	Window,
	ChannelHeader,
	MessageList,
	MessageInput,
	Thread,
	LoadingIndicator,
} from "stream-chat-react";

import "@stream-io/stream-chat-css/dist/css/index.css";

const apiKey = "qb56zpxdw4yb";

const user = {
	id: "john",
	name: "John",
	image:
		"https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fG1hbnxlbnwwfDJ8MHx8&auto=format&fit=crop&w=900&q=60",
};

export default function App() {
	const [client, setClient] = useState(null);
	const [channel, setChannel] = useState(null);

	useEffect((client) => {
		async function init() {
			const chatClient = StreamChat.getInstance(apiKey);

			await chatClient.connectUser(
				user,
				chatClient.devToken(user.id)
			);

			const channel = chatClient.channel(
				"messaging",
				"react-talk",
				{
					name: "Talk about React",
					members: [user.id],
				}
			);

			await channel.watch();

			setChannel(channel);
			setClient(chatClient);
		}

		init();

		if (client) return () => client.disconnectUser();
	}, []);

	if (!channel || !client) return <LoadingIndicator />;

	return (
		<Chat client={client} theme="messaging dark">
			<Channel channel={channel}>
				<Window>
					<ChannelHeader />
					<MessageList />
					<MessageInput />
				</Window>
				<Thread />
			</Channel>
		</Chat>
	);
}
